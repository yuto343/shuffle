package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/ChimeraCoder/anaconda"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type MicroCMSWebhookRequestBody struct {
	Service string `json:"service"`
	Api     string `json:"api"`
	Id      string `json:"id"`
	Type    string `json:"type"`
}

type MicroCMSBlogResponse struct {
	Id        string    `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Title     string    `json:"title"`
	Sentence  string    `json:"sentence"`
}

func webhookHandler(c *gin.Context) {
	// リクエストをバリデートする
	if c.Request.Header.Get("Content-Type") != "application/json" {
		log.Println("error: invalid request content type")
		c.Status(http.StatusBadRequest)
		return
	}

	// TODO: responseが5分返ってこないのはよくないので、リクエストが来たらジョブキューにいれるなどしてレスポンスを返す実装にするとよさそう
	// time.Sleep(5 * time.Minute) // 記事が実際にデプロイされるまで3分程度かかるためスリープする

	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusInternalServerError)
		return
	}
	defer c.Request.Body.Close()

	microCMSWebhookRequestBody := MicroCMSWebhookRequestBody{}
	if err := json.Unmarshal(body, &microCMSWebhookRequestBody); err != nil {
		log.Println(err)
		c.Status(http.StatusInternalServerError)
		return
	}

	if microCMSWebhookRequestBody.Type != "new" {
		log.Println("error: invalid webhook type")
		c.Status(http.StatusInternalServerError)
		return
	}

	fmt.Println(microCMSWebhookRequestBody)
	c.Status(http.StatusOK)
	return

	// MicroCMS側が最新のブログ記事を返すようになるまでしばらく時間がかかる
	time.Sleep(5 * time.Second)

	blogReq, _ := http.NewRequest("GET", "https://shuffle-snow.microcms.io/api/v1/blogs/"+microCMSWebhookRequestBody.Id, nil)
	blogReq.Header.Set("X-API-KEY", os.Getenv("X_API_KEY"))

	client := new(http.Client)
	resp, err := client.Do(blogReq)

	blogBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	microCMSBlogResponse := MicroCMSBlogResponse{}
	if err := json.Unmarshal(blogBody, &microCMSBlogResponse); err != nil {
		log.Println(err)
		c.Status(http.StatusInternalServerError)
		return
	}

	tweetContent := "新しい記事が投稿されました #shuffle_snowboarding\n"
	tweetContent += microCMSBlogResponse.Title + " - @shuffle_DU\n"
	tweetContent += "https://www.shuffle-snowboarding.style/blogs/" + microCMSBlogResponse.Id

	// TODO: Twitter APIを叩き、ブログ記事についてのツイートする
	api := getTwitterApi()
	tweet, err := api.PostTweet(tweetContent, nil)
	if err != nil {
		log.Println(err)
		c.Status(http.StatusInternalServerError)
		return
	}
	fmt.Println(tweet.Text)

	c.Status(http.StatusOK)
}

func getTwitterApi() *anaconda.TwitterApi {
	anaconda.SetConsumerKey(os.Getenv("CONSUMER_KEY"))
	anaconda.SetConsumerSecret(os.Getenv("CONSUMER_SECRET"))
	return anaconda.NewTwitterApi(os.Getenv("ACCESS_TOKEN_KEY"), os.Getenv("ACCESS_TOKEN_SECRET"))
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	// productionではheroku-configで設定する
	// loadEnv()
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("ENV $PORT must be set")
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.POST("/microcms_webhook", webhookHandler)
	router.Run(":" + port)
}

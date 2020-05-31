# Shuffle official website

![image](https://user-images.githubusercontent.com/43196286/81503525-ffe94100-931e-11ea-8f79-54ff371d2245.png)
同志社大学を拠点に活動するスノーボードサークル shuffle の公式 web サイトです。
https://www.shuffle-snowboarding.style/

## Get started

クローンして

```sh
npm install
```

開発環境は

```sh
npm run dev
```

で立ち上がります。

## 使用技術について

- Gatsby.js(https://www.gatsbyjs.org/)
- tailwindcss(https://tailwindcss.com/)
- microCms(https://microcms.io/)
- Netlify(https://www.netlify.com/)

## 自動ツイート機能について

Netlify を複数人で扱うには課金が必要なため、Heroku 上に MicroCMS からの Webhook を受けるサーバーを立ち上げる。
`/webhook_server`に対象のソースコードはある。
TODO: Netlify で新着記事をビルドしデプロイする時に同時に TwitterAPI を叩けばより簡単にできる。

`.env`を埋める。環境変数は担当者に聞いてください。

```
X_API_KEY=<your microCMS's api key>
CONSUMER_KEY=<your twitter app's consumer key>
CONSUMER_SECRET=<your twitter app's consumer secret>
ACCESS_TOKEN_KEY=<your account's access token>
ACCESS_TOKEN_SECRET=<your account's access secret>
```

```
// .envの環境変数をHerokuにpushする
$ heroku plugins:install heroku-config
$ heroku config:push

// サブディレクトリをHerokuにpushする
$ git subtree push --prefix webhook_server/ heroku master
// subtree pushには-fがないのでforce pushしたい場合は以下
$ git push heroku `git subtree split --prefix webhook_server/ master`:master --force
```

### 開発においての留意事項

- tailwindcss を用いてスタイルを書いています。
  tailwindcss で補えない分のスタイルは./src/css/style.css にあります。
  そのほかは基本的に普通の gatsbyjs で作るサイトです。

- headlessCMS には microCms を用いているので gatsby-source-microcms(https://www.gatsbyjs.org/packages/gatsby-source-microcms) プラグインを使用しています。

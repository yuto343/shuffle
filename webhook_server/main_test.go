package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestWebhookHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	_, r := gin.CreateTestContext(w)

	r.POST("/microcms_webhook", webhookHandler)
	req, err := http.NewRequest("POST", "/microcms_webhook", nil)
	if err != nil {
		t.Fatal(err)
	}
	r.ServeHTTP(w, req)

	if status := w.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}

	// TODO: testかく
}

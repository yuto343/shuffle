package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestWebhookHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/microcms_webhook", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(webhookHandler)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// TODO: testかく
}

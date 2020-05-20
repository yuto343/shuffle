FROM golang:latest

RUN mkdir -p /go/src/github.com/Yuto-Nakano/shuffle/webhook_server
ADD . /go/src/github.com/Yuto-Nakano/shuffle/webhook_server
WORKDIR /go/src/github.com/Yuto-Nakano/shuffle/webhook_server

CMD go run main.go

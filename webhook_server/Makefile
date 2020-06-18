## Install dependencies
.PHONY: deps
deps:
	go get -v -d

## Run tests
.PHONY: test
test: deps
	go test ./... -v

## Build binary
.PHONY: build
build: deps
	go build -o main

## Run binary
.PHONY: run
run: build
	export $(cat .env | grep -v ^# | xargs); PORT=3000 ./main

## Clean binary
.PHONY: clean
clean:
	go clean
	rm -f main

## Show help
.PHONY: help
help:
	@make2help $(MAKEFILE_LIST)

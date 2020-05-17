package main

import (
	"log"
	"net/http"

	"meme-scout-25/backend/handler"
)

func main() {
	log.Printf("Server started")

	router := handler.NewRouter()

	log.Fatal(http.ListenAndServe(":8081", router))
}

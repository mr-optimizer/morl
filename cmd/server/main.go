package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"

	"github.com/mr-optimizer/morl/internal/handlers"
	"github.com/mr-optimizer/morl/internal/utils"
)


func InitializeRouter() *mux.Router {
	router := mux.NewRouter()

	// API routes
	router.HandleFunc("/", handlers.HomeHandler).Methods("GET")
	// router.HandleFunc("/login", handlers.LoginHandler).Methods("POST")
	// router.HandleFunc("/signup", handlers.SignupHandler).Methods("POST")
	// router.HandleFunc("/create-room", handlers.CreateRoomHandler).Methods("POST")
	// router.HandleFunc("/join-room/{roomID}", handlers.JoinRoomHandler).Methods("GET")

	return router
}

func main() {
	utils.InitLogger()

	router := InitializeRouter()

	log.Info("Starting Morl server on port 8080...")
	fmt.Println("Starting Morl server on port 8080...")
	
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	// "context"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"

	"github.com/mr-optimizer/morl/internal/handlers"
	"github.com/mr-optimizer/morl/internal/utils"
	"github.com/mr-optimizer/morl/internal/db/redis"
	"github.com/mr-optimizer/morl/internal/db/mongo"
	"github.com/mr-optimizer/morl/internal/db/postgres"
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
	redis.InitRedis("localhost:6379", "", 0)
	mongo.ConnectToMongo()
	// Connect to PostgreSQL Primary
	postgres.ConnectToPrimary()

	// Connect to PostgreSQL Replica
	postgres.ConnectToReplica()

	// Set up a channel to listen for OS signals
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	router := InitializeRouter()


	defer func() {
        // if err := mongo.GetMongoClient().Disconnect(context.Background()); err != nil {
        //     log.Fatalf("Error disconnecting from MongoDB: %v", err)
        // }
		postgres.ClosePrimary()
		postgres.CloseReplica()
		redis.CloseRedis()
    }()
	// Start the server in a goroutine to allow graceful shutdown
	go func() {
		log.Info("Starting Morl server on port 4000...")
		fmt.Println("Starting Morl server on port 4000...")

		if err := http.ListenAndServe(":4000", router); err != nil {
			log.Errorf("Failed to start server: %v", err)
		}
	}()

	// Wait for shutdown signal
	<-stop
	log.Info("Shutting down Morl application...")

	// Perform cleanup tasks
	redis.CloseRedis()

	log.Info("Morl application gracefully stopped.")
}

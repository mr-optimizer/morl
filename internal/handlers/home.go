package handlers

import (
	"net/http"
	"os"

	log "github.com/sirupsen/logrus"
	"github.com/mr-optimizer/morl/internal/db/redis"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	serverID := os.Getenv("SERVER_ID")
	log.Info("HomeHandler: Received a request for the home page")
	err := redis.SetValue("key", "value")
	if err != nil {
		log.Error("Error setting value:", err)
	}

	value, err := redis.GetValue("key")
	if err != nil {
		log.Info("Error getting value:", err)
	} else {
		log.Info("Value:", value)
	}
	if serverID == "" {
		serverID = "Unknown"
	}
	w.Header().Set("X-Server-ID", serverID)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Welcome to The Morl world!"))
}

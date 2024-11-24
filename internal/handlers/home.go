package handlers

import (
	"net/http"

	log "github.com/sirupsen/logrus"
	"github.com/mr-optimizer/morl/internal/db/redis"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
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

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Welcome to Morl!"))
}

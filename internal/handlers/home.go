package handlers

import (
	"net/http"

	log "github.com/sirupsen/logrus"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	log.Info("HomeHandler: Received a request for the home page")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Welcome to Morl!"))
}

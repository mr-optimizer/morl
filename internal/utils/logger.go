package utils

import (
	"os"

	lrf "github.com/banzaicloud/logrus-runtime-formatter"
	log "github.com/sirupsen/logrus"
)

// var log *logrus.Logger

func InitLogger() {
	// log = logrus.New()

	log.SetFormatter(&lrf.Formatter {
		ChildFormatter: &log.TextFormatter{
			TimestampFormat : "2006-01-02 15:04:05",
            FullTimestamp:true,
		},
		Line:            true,
		File:            true,
		BaseNameOnly:    true,
	})

	logFile, err := os.OpenFile("morl.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)

	if err != nil {
		log.SetOutput(os.Stdout)
		log.Warn("Failed to log to file, using default stderr")
	} else {
		log.SetOutput(logFile)
	}

	log.SetLevel(log.InfoLevel)

	log.Info("Logger initialized and writing to file morl.log")
}

package mongo

import (
    "context"
    "fmt"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

// MongoDB connection parameters
const (
	mongoURI      = "mongodb://admin:admin@morl_mongodb:27017"
	databaseName  = "morl"
	collectionName = "tempCollection"
)


var mongoClient *mongo.Client;

func ConnectToMongo() {
    mongoURI := "mongodb://admin:admin@morl_mongodb:27017/morl?authMechanism=SCRAM-SHA-256"

    clientOptions := options.Client().ApplyURI(mongoURI).SetAuth(options.Credential{
        AuthMechanism: "SCRAM-SHA-256",
        Username:      "admin",
        Password:      "admin",
    })
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    newClient, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatalf("Failed to connect to MongoDB: %v", err)
    } else {
        mongoClient = newClient
    }

    // Verify connection
    err = mongoClient.Ping(ctx, nil)
    if err != nil {
        log.Fatalf("MongoDB ping failed: %v", err)
    }

    fmt.Println("Connected to MongoDB Replica Set!")
}

// GetMongoClient returns the MongoDB client instance
func GetMongoClient() *mongo.Client {
    return mongoClient
}

package redis

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"

	log "github.com/sirupsen/logrus"

)

var (
	RedisClient *redis.Client
	Ctx         = context.Background()
)

// InitRedis initializes the Redis client
func InitRedis(address, password string, db int) {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     address,
		Password: password, // Set an empty password if not required
		DB:       db,       // Default DB is 0
	})

	// Test the connection
	err := RedisClient.Ping(Ctx).Err()
	if err != nil {
		log.Error("Failed to connect to Redis: %v", err)
	} else {
		log.Info("Successfully connected to Redis")
	}
}

// CloseRedis closes the Redis client connection
func CloseRedis() {
	if RedisClient != nil {
		err := RedisClient.Close()
		if err != nil {
			log.Error("Error closing Redis connection: %v", err)
		} else {
			log.Info("Redis connection closed")
		}
	}
}

// SetValue sets a key-value pair in Redis
func SetValue(key string, value interface{}) error {
	err := RedisClient.Set(Ctx, key, value, 0).Err()
	if err != nil {
		return fmt.Errorf("could not set key %s: %v", key, err)
	}
	return nil
}

// GetValue retrieves a value by key from Redis
func GetValue(key string) (string, error) {
	value, err := RedisClient.Get(Ctx, key).Result()
	if err != nil {
		if err == redis.Nil {
			return "", fmt.Errorf("key %s does not exist", key)
		}
		return "", fmt.Errorf("could not get key %s: %v", key, err)
	}
	return value, nil
}

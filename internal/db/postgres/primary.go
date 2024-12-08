package postgres

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq" // PostgreSQL driver
)

var primaryDB *sql.DB

// ConnectToPrimary connects to the PostgreSQL primary (master) database
func ConnectToPrimary() {
	connStr := "host=postgres_primary user=admin password=admin dbname=morl sslmode=disable"
	// postgresURI := "postgresql://admin:admin@postgres_primary:5432/morl"

	var err error
	primaryDB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to connect to PostgreSQL Primary: %v", err)
	}

	// Verify the connection
	err = primaryDB.Ping()
	if err != nil {
		log.Fatalf("PostgreSQL Primary ping failed: %v", err)
	}

	fmt.Println("Connected to PostgreSQL Primary!")
}

// GetMongoClient returns the primary client instance
func GetPrimaryPClient() *sql.DB {
    return primaryDB
}

// ClosePrimary closes the primary database connection
func ClosePrimary() {
	if primaryDB != nil {
		err := primaryDB.Close()
		if err != nil {
			log.Fatalf("Error closing PostgreSQL Primary connection: %v", err)
		}
	}
}

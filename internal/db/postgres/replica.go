package postgres

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq" // PostgreSQL driver
)

var replicaDB *sql.DB

// ConnectToReplica connects to the PostgreSQL replica (slave) database
func ConnectToReplica() {
	connStr := "host=postgres_replica user=admin password=admin dbname=morl sslmode=disable"

	var err error
	replicaDB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Failed to connect to PostgreSQL Replica: %v", err)
	}

	// Verify the connection
	err = replicaDB.Ping()
	if err != nil {
		log.Fatalf("PostgreSQL Replica ping failed: %v", err)
	}

	fmt.Println("Connected to PostgreSQL Replica!")
}

// CloseReplica closes the replica database connection
func CloseReplica() {
	if replicaDB != nil {
		err := replicaDB.Close()
		if err != nil {
			log.Fatalf("Error closing PostgreSQL Replica connection: %v", err)
		}
	}
}

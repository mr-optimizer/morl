# Stage 1: Build the application
FROM golang:1.21 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the application source code
COPY . .

# Build the application
RUN go build -o server ./main.go

# Stage 2: Create a lightweight runtime image
FROM ubuntu:22.04

# Install necessary libraries for the runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/server .

# Copy configuration files
COPY config ./configs

# Expose the port your application listens on
EXPOSE 4000

# Set the entry point for the container
CMD ["./server"]

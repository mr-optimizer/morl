# Morl - A Multiplayer Online Game

Morl is a multiplayer online game inspired by **Scribble.io**, featuring real-time group video calls, login/signup functionality, room creation, and more. The game supports multiplayer drawing and guessing game mechanics, allowing players to join rooms, invite friends, and interact in real-time.

---

## Features

- **Login/Signup**: Secure user authentication and authorization.
- **Create Room**: Create new game rooms for multiplayer gameplay.
- **Invite Players**: Share room links with friends and invite them to join.
- **Real-Time Interaction**: In-game chat, drawing, and guessing, with support for real-time gameplay.
- **Video Group Call Support**: Integrated group video calls while playing the game, enhancing the social interaction experience.
- **Auto Matching**: Automated matchmaking system to pair users in different game modes.

---

## Technologies Used

- **Go (Golang)**: Backend API implementation.
- **Gorilla Mux**: HTTP routing for handling API endpoints.
- **Logrus**: Structured logging for better debugability and error handling.
- **Redis**: Used for caching and managing real-time game state.
- **Kafka**: Messaging system for game events and real-time player interactions.
- **RabbitMQ**: Message queue for event-driven architecture.
- **AWS SQS**: For handling asynchronous background tasks and events.
- **MongoDB**: Non-relational database to store game data and user profiles.
- **MySQL**: Relational database for storing structured user and game data.
- **WebSocket**: Real-time communication for in-game chat and drawing updates.
- **Docker**: Containerized environment for the application.

---

## Prerequisites

Before running the project, ensure the following tools are installed:

- **Docker**: To run containers for databases, queues, and services.
- **Go (v1.18+)**: To build and run the Go server.
- **React** For frontend

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/morl.git
cd morl
```

### 2. Install Dependencies
Use the Go module system to install project dependencies.
```bash
go mod tidy
```

### 3. Docker Setup
If you want to run the project with Docker and Docker Compose for easier local development, you can set up all dependencies (Redis, Kafka, RabbitMQ, etc.)

### 4. Running the Application
```bash
go run cmd/server/main.go
```
The server will start on http://localhost:8080.


## Contribution Guidelines

1. Fork the repository.
2. Create a new branch:
```bash
git checkout -b feature/your-feature
```
3. Make your changes and commit them:
```bash
git commit -am 'Add new feature'
```
4. Push your branch:
```bash
git push origin feature/your-feature
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Contact

For questions or inquiries, feel free to reach out:

- **Email**: sktovisit@gmail.com
- **GitHub**: [github.com/mr-optimizer](https://github.com/mr-optimizer)

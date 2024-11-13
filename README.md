# Federated Recommender System

A federated learning-based recommendation system where a central model trains and updates based on aggregated user data without compromising privacy. Users receive personalized recommendations locally, while the central server learns across clients to improve model accuracy.

## Features

- **Federated Learning**: Decentralized training with Flower and PyTorch to maintain user data privacy.
- **Recommendation System**: Suggests personalized items based on user preferences and model inference.
- **Real-time Dashboard**: Frontend dashboard with analytics and insights.
- **Scalable Microservices**: Dockerized services for client, server, ML server, and database (MongoDB).

## Project Structure

```
federated_recommender/
├── client/                 # React frontend
├── server/                 # Express.js backend
├── ml_server/              # Federated ML server using Flower and PyTorch
├── docker/                 # Docker configurations
├── docker-compose.yml      # Docker Compose file to run all services
└── README.md               # Project documentation
```

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express, MongoDB, JWT for authentication
- **Federated Learning**: Flower, PyTorch
- **Containerization**: Docker, Docker Compose

## Prerequisites

Make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aravinthakshan/federated_recommender.git
   cd federated_recommender
   ```

2. **Environment Variables**

   Create a `.env` file in the `server/` directory with the following content:

   ```
   JWT_SECRET=your_jwt_secret
   MONGO_URI=mongodb://mongo:27017/federated_recommender
   ```

3. **Docker Compose Setup**

   Start all services (client, server, ml_server, and MongoDB) using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will:

   - Launch the React frontend at `http://localhost:3000`
   - Launch the Express backend at `http://localhost:5000`
   - Launch the federated ML server on port `8080`
   - Launch MongoDB on port `27017`

## Usage

### Access the Dashboard

1. Visit `http://localhost:3000` to access the client dashboard.
2. Log in or register for an account.
3. View personalized recommendations, analytics, and interact with the recommendation system.

### API Endpoints

The backend server exposes several key endpoints:

- **Authentication**
  - `POST /api/auth/register`: Register a new user
  - `POST /api/auth/login`: Log in a user and receive a JWT token

- **Recommendations**
  - `GET /api/recommendations`: Get personalized recommendations for the logged-in user

### Federated Learning Process

1. The central server (ml_server) communicates with clients (user devices) to exchange model updates without accessing raw data.
2. Each client trains the recommendation model locally and sends model updates to the server.
3. The server aggregates updates using a federated averaging strategy and updates the central model.

## Directory Overview

- **client/**: Contains React frontend components, services, and context.
- **server/**: Contains Express backend, user models, authentication, and recommendation endpoints.
- **ml_server/**: Contains the federated training scripts with Flower, PyTorch model, and client/server scripts.
- **docker/**: Holds Dockerfiles for each service (client, server, ml_server).

## Example Requests

### Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
        "email": "test@example.com",
        "password": "password123"
      }'
```

### Get Recommendations

```bash
curl -X GET http://localhost:5000/api/recommendations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

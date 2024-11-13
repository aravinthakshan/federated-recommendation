# Federated Recommender System

A federated learning-based recommendation system where a central model trains and updates based on aggregated user data without compromising privacy. Users receive personalized recommendations locally, while the central server learns across clients to improve model accuracy.

## Features

- **Federated Learning**: Decentralized training with Flower and PyTorch to maintain user data privacy.
- **Recommendation System**: Suggests personalized items based on user preferences and model inference.
- **Real-time Dashboard**: Frontend dashboard with analytics and insights.
- **Scalable Microservices**: Dockerized services for client, server, ML server, and database (MongoDB).

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express, MongoDB, JWT for authentication
- **Federated Learning**: Flower, PyTorch
- **Containerization**: Docker, Docker Compose

## Prerequisites

Make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

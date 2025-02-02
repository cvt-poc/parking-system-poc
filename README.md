![Alt text](images/screenshot.png)

# Parking Lot Management System

## Overview

The Parking Lot Management System is a web application designed to manage vehicle entries, exits, and parking space tracking. The system is built using a FastAPI backend and a React frontend, and it is deployed using Docker and Kubernetes.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Vehicle entry and exit management
- Parking space tracking
- User authentication and authorization
- Real-time updates
- API documentation with Swagger

## Architecture

The system consists of the following components:

- **Backend**: FastAPI application for handling API requests and database operations.
- **Frontend**: React application for the user interface.
- **Database**: PostgreSQL database for storing data.
- **Containerization**: Docker for containerizing the applications.
- **Orchestration**: Kubernetes for deploying and managing the containers.

## Prerequisites

- Docker
- Kubernetes
- kubectl
- AWS CLI (for deployment to AWS)
- Terraform (for infrastructure as code)

## Installation

### Backend

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/parking-lot.git
   cd parking-lot/backend
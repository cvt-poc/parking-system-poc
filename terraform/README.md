# Parking Lot Management System - Terraform

## Overview

This directory contains the Terraform configuration files for provisioning the infrastructure required by the Parking Lot Management System. The infrastructure includes a VPC, EKS cluster, RDS instance, ECR repository, and other necessary resources on AWS.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Modules](#modules)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Architecture

The Terraform configuration provisions the following resources:

- **VPC**: Virtual Private Cloud with public and private subnets.
- **EKS**: Elastic Kubernetes Service cluster for running the application.
- **RDS**: Relational Database Service instance for PostgreSQL.
- **ECR**: Elastic Container Registry for storing Docker images.
- **IAM Roles and Policies**: Necessary IAM roles and policies for the EKS cluster and other services.
- **S3 Bucket**: For storing static assets.
- **ALB**: Application Load Balancer for managing traffic to the EKS services.
- **Route 53**: DNS management for custom domains.

## Prerequisites

- AWS CLI configured with appropriate credentials
- Terraform installed (version 1.0 or higher)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd parking-lot/terraform
   ```
2. Init
    `terraform init`
3. Usage
Usage
Applying the Terraform Configuration
Review and customize the variables in variables.tf as needed.

Apply the Terraform configuration:

apply
Confirm the apply action by typing yes when prompted.

Destroying the Infrastructure
To destroy the infrastructure created by Terraform, run:

destroy
Confirm the destroy action by typing yes when prompted.

Modules
VPC Module
Provisions a VPC with public and private subnets, and a NAT gateway.

EKS Module
Sets up an EKS cluster with managed node groups.

RDS Module
Creates an RDS instance for PostgreSQL.

ECR Module
Creates an ECR repository with a lifecycle policy to manage image retention.

IAM Roles and Policies
Sets up IAM roles and policies for the EKS cluster and other services.

S3 Bucket
Creates an S3 bucket for storing static assets.

ALB Module
Creates an Application Load Balancer for managing traffic to the EKS services.

Route 53
Sets up a DNS record for the frontend.

Environment Variables
Ensure the following variables are defined in variables.tf:


variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "canonical_user_id" {
  description = "Canonical user ID for S3 bucket"
  type        = string
}
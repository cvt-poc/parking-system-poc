provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "parking-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["${var.aws_region}a", "${var.aws_region}b", "${var.aws_region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

}

module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "parking-cluster"
  cluster_version = "1.27"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    general = {
      desired_size = 2
      min_size     = 1
      max_size     = 3

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = {
    Environment = var.environment
    Project     = "parking-system"
  }
}

module "ecr" {
  source = "terraform-aws-modules/ecr/aws"

  repository_name = "parking-system"
  
  repository_lifecycle_policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 30 images"
        selection = {
          tagStatus     = "any"
          countType     = "imageCountMoreThan"
          countNumber   = 30
        }
        action = {
          type = "expire"
        }
      }
    ]
  })

  tags = {
    Environment = var.environment
    Project     = "parking-system"
  }
}

module "db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "parking-db"
  engine = "postgres"
  engine_version = "13.3"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  db_name = "parking_db"
  username = "postgres"
  password = "yourpassword"
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  db_subnet_group_name = module.vpc.database_subnet_group
  multi_az = false
  publicly_accessible = false

  tags = {
    Environment = var.environment
    Project     = "parking-system"
  }
}

module "eks_iam" {
  source = "terraform-aws-modules/iam/aws//modules/eks"
  

}

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "parking-system-frontend-${var.environment}"
  grant {
    type        = "CanonicalUser"
    permissions = ["FULL_CONTROL"]
    id          = "your-canonical-user-id"
  }

  tags = {
    Environment = var.environment
    Project     = "parking-system"
  }
}

module "alb" {
  source = "terraform-aws-modules/alb/aws"

  name = "parking-alb"
  load_balancer_type = "application"
  vpc_id = module.vpc.vpc_id
  subnets = module.vpc.public_subnets

  tags = {
    Environment = var.environment
    Project     = "parking-system"
  }
}

resource "aws_route53_record" "frontend" {
  zone_id = "your_zone_id"
  name    = "parking.yourdomain.com"
  type    = "A"

  alias {
    name                   = module.alb.dns_name
    zone_id                = module.alb.zone_id
    evaluate_target_health = true
  }    
}
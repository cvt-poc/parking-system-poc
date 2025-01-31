terraform {
  backend "s3" {
    bucket = "parking-system-terraform-state"
    key    = "terraform.tfstate"
    region = "us-west-2"
    dynamodb_table = "parking-system-terraform-locks"
    encrypt = true
  }
}
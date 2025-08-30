# Deployment Configuration Guide

## Environment Configuration

### 1. Frontend Config (`config.json`)
- **Runtime configuration loading** from JSON file
- **No hardcoded environment logic** in JavaScript
- **Ops teams can swap configs** without touching code
- **Contains only API URL and environment name**

### 2. Backend Config (Spring Boot)
- **AWS S3 configuration** in `application.properties`
- **Database configuration** per environment
- **Environment variables** for sensitive data

## Configuration Files

### Frontend Configuration
```json
{
  "environment": "development",
  "apiBaseUrl": "http://localhost:3001/api"
}
```

### Backend Configuration
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/customer_info
spring.datasource.username=customer_user
spring.datasource.password=${DB_PASSWORD}

# AWS S3
aws.s3.bucket-name=customer-documents-dev
aws.region=us-east-1
aws.access-key-id=${AWS_ACCESS_KEY_ID}
aws.secret-access-key=${AWS_SECRET_ACCESS_KEY}
```

## Deployment Process

### Frontend Deployment
```bash
# Development
cp environments/dev/config.json web/config.json

# Test
cp environments/test/config.json web/config.json

# Production
cp environments/prod/config.json web/config.json
```

### Backend Deployment
Set environment variables:
```bash
# Database
export DB_PASSWORD=your-db-password

# AWS (Development/Test)
export AWS_ACCESS_KEY_ID=your-access-key
export AWS_SECRET_ACCESS_KEY=your-secret-key

# Production: Use IAM roles instead of access keys
```

## Environment-Specific Settings

### Development
- **Frontend**: `http://localhost:3001/api`
- **Backend**: Local PostgreSQL, S3 dev bucket
- **AWS**: Access keys via environment variables

### Production
- **Frontend**: `https://api.yourcompany.com/api`
- **Backend**: Production PostgreSQL, S3 prod bucket
- **AWS**: IAM roles (no access keys needed)

## Security Best Practices
- ✅ **No AWS credentials** in frontend code
- ✅ **Environment variables** for sensitive backend data
- ✅ **IAM roles** in production environments
- ✅ **Separate S3 buckets** per environment
- ✅ **HTTPS** in production
- ✅ **Database credentials** via environment variables

## Directory Structure
```
environments/
├── dev/config.json
├── test/config.json
└── prod/config.json
web/
└── config.json (copied by ops)
api/src/main/resources/
├── application.properties
├── application-dev.properties
└── application-prod.properties
```
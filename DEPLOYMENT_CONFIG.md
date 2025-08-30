# Deployment Configuration Guide

## Environment Configuration

### 1. JSON-Based Config (`config.json`)
- **Runtime configuration loading** from JSON file
- **No hardcoded environment logic** in JavaScript
- **Ops teams can swap configs** without touching code
- **Environment-specific configurations**

### 2. Security Best Practices

#### Development
```javascript
// Use local credentials (not in source control)
accessKeyId: process.env.AWS_ACCESS_KEY_ID
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
```

#### Production
```javascript
// Use IAM roles, STS tokens, or AWS Cognito
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'your-identity-pool-id'
});
```

### 3. Environment Variables

#### For Web App (build time)
```bash
# .env.development
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_S3_BUCKET=customer-documents-dev

# .env.production  
REACT_APP_API_URL=https://api.yourcompany.com/api
REACT_APP_S3_BUCKET=customer-documents-prod
```

#### For Spring Boot API
```properties
# application-dev.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/customer_info_dev

# application-prod.properties
spring.datasource.url=jdbc:postgresql://prod-db:5432/customer_info_prod
```

### 4. Deployment Process

#### For each environment, ops teams copy the appropriate config:
```bash
# Development
cp environments/dev/config.json web/config.json

# Test
cp environments/test/config.json web/config.json

# Production
cp environments/prod/config.json web/config.json
```

#### Directory Structure:
```
environments/
├── dev/config.json
├── test/config.json
└── prod/config.json
web/
└── config.json (copied by ops)
```

### 5. Security Notes
- **Never commit credentials** to source control
- **Use IAM roles** in AWS environments
- **Use environment variables** for sensitive data
- **Implement proper CORS** policies
- **Use HTTPS** in production
# AWS S3 Backend Configuration

## Configuration Options

### 1. Environment Variables (Recommended)
```bash
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

### 2. Application Properties
Update `application.properties`:
```properties
aws.access-key-id=your-access-key-id
aws.secret-access-key=your-secret-access-key
aws.region=us-east-1
aws.s3.bucket-name=customer-documents-dev
```

### 3. IAM Roles (Production Recommended)
For EC2/ECS deployment, use IAM roles instead of access keys:

Remove credentials from `AwsConfig.java` and use:
```java
@Bean
public S3Client s3Client() {
    return S3Client.builder()
            .region(Region.of(region))
            .build(); // Uses IAM role automatically
}
```

## Required S3 Permissions
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::customer-documents-*/*"
    }
  ]
}
```

## Environment-Specific Buckets
- **Development**: `customer-documents-dev`
- **Test**: `customer-documents-test`  
- **Production**: `customer-documents-prod`

## Security Best Practices
- ✅ Use environment variables for credentials
- ✅ Use IAM roles in production
- ✅ Separate buckets per environment
- ✅ Enable S3 bucket versioning
- ✅ Configure bucket policies for least privilege
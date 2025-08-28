# S3 Setup Instructions

## 1. Create S3 Bucket
```bash
aws s3 mb s3://customer-documents-bucket --region us-east-1
```

## 2. Configure Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/YOUR_IAM_USER"
      },
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::customer-documents-bucket/*"
    }
  ]
}
```

## 3. Update Configuration
Edit `web/s3-config.js`:
```javascript
const S3_CONFIG = {
  bucketName: 'your-actual-bucket-name',
  region: 'your-aws-region',
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key'
};
```

## 4. Security Note
For production, use:
- IAM roles instead of access keys
- Presigned URLs for uploads
- Environment variables for configuration

## 5. CORS Configuration
Add to S3 bucket CORS:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST"],
    "AllowedOrigins": ["http://localhost:3000", "http://localhost:8080"],
    "ExposeHeaders": []
  }
]
```
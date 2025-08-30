// S3 Configuration from centralized config
const S3_CONFIG = window.APP_CONFIG.s3Config;

// Initialize AWS S3 - Use IAM roles or temporary credentials in production
// For development only - replace with proper authentication
if (window.APP_CONFIG.environment === 'development') {
  AWS.config.update({
    accessKeyId: 'YOUR_DEV_ACCESS_KEY', // Use environment variables
    secretAccessKey: 'YOUR_DEV_SECRET_KEY', // Use environment variables
    region: S3_CONFIG.region
  });
} else {
  // Production should use IAM roles, STS tokens, or Cognito
  console.warn('Production S3 authentication not configured');
}

const s3 = new AWS.S3();

// S3 Upload Function
const uploadToS3 = async (file, customerId) => {
  const fileName = `customer-${customerId}/${Date.now()}-${file.name}`;
  
  const params = {
    Bucket: S3_CONFIG.bucketName,
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: 'private'
  };

  try {
    const result = await s3.upload(params).promise();
    return {
      success: true,
      url: result.Location,
      key: result.Key,
      fileName: file.name,
      uploadDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('S3 Upload Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

window.uploadToS3 = uploadToS3;
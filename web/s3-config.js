// S3 Configuration
const S3_CONFIG = {
  bucketName: 'customer-documents-bucket', // Replace with your bucket name
  region: 'us-east-1', // Replace with your AWS region
  accessKeyId: 'YOUR_ACCESS_KEY_ID', // Replace with your access key
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY' // Replace with your secret key
};

// Initialize AWS S3
AWS.config.update({
  accessKeyId: S3_CONFIG.accessKeyId,
  secretAccessKey: S3_CONFIG.secretAccessKey,
  region: S3_CONFIG.region
});

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
// Configuration Loader
const loadConfig = async () => {
  try {
    const response = await fetch('./config.json');
    if (!response.ok) throw new Error('Failed to load config');
    return await response.json();
  } catch (error) {
    console.error('Error loading config:', error);
    // Fallback config
    return {
      environment: 'development',
      apiBaseUrl: 'http://localhost:3001/api',
      s3Config: {
        bucketName: 'customer-documents-dev',
        region: 'us-east-1'
      }
    };
  }
};

// Initialize configuration
window.initializeApp = async () => {
  window.APP_CONFIG = await loadConfig();
  console.log('App initialized with config:', window.APP_CONFIG.environment);
};
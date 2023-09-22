// Environment
const ENV = process.env.NODE_ENV || 'development';

// Configuration
const config = {
  development: {
    telegram: {
      token: 'YOUR_DEV_TOKEN' 
    }
  },

  production: {
    telegram: {
      token: 'YOUR_PROD_TOKEN'
    }
  }
};

// Export config for current env 
module.exports = config[ENV];

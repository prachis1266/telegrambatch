// Dependencies
const express = require('express');
const axios = require('axios');

// Authentication 
const authenticate = require('./authenticate');

// Telegram API endpoint
const API_URL = 'https://api.telegram.org/bot';

// Bot token
const BOT_TOKEN = 'YOUR_BOT_TOKEN'; 

// Initialize Express app
const app = express();

// Apply authentication middleware
app.use(authenticate);

// Authentication middleware
function authenticate(req, res, next) {

    const token = req.header('Authorization');
  
    if(!token) {
      return res.status(401).send('Unauthorized');
    }
  
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      req.user = payload;
    } catch(err) {
      return res.status(401).send('Invalid token');
    }
  
    next();
  
  }
  
  // Helper functions
  
  function splitFile(file) {
  
    const CHUNK_SIZE = 10000; // 10KB 
    const chunks = [];
  
    for(let i = 0; i < file.size; i += CHUNK_SIZE) {
      chunks.push(file.slice(i, i + CHUNK_SIZE)); 
    }
  
    return chunks;
  
  }
  
  function combineChunks(chunks) {
  
    const fullFile = new Blob(chunks);
  
    return fullFile;
  
  }
  
  function getFileSize(file) {
  
    return file.size;
  
  }
  
  function getFileType(file) {
  
    return file.type;
  
  }
  
  module.exports = {
    authenticate,
    splitFile,
    combineChunks,
    getFileSize,
    getFileType
  };
  
const { uploadFile } = require('./api');

// Upload file 
async function upload(file, chatId) {

  try {
    // Upload via Telegram API
    await uploadFile(chatId, file);  
    
    console.log('Upload complete!');

  } catch(err) {
    console.error('Upload failed', err);
  }

}

// Export function
module.exports = {
  upload  
};

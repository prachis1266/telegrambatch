const { downloadFile } = require('./api');

// Download file
async function download(fileId) {

  try {
    // Download file via API
    const file = await downloadFile(fileId);
    
    // Write file to disk
    await writeFile(file);
    
    console.log('Download complete!');

  } catch(err) {
    console.error('Download failed', err);
  }

}

// Write file to disk
async function writeFile(file) {

    // Generate file name
    const fileName = `download-${Date.now()}.bin`;
  
    // Write chunks to file
    await fsPromises.writeFile(fileName, file);
  
    return fileName;
  
  }
  
  // Helper functions
  
 // Get original file name from mapping
function getFileName(fileId) {

    // Lookup file name in database
    const fileName = database.getFile(fileId).name;
  
    return fileName;
  
  }
  
  // Save file info to database
  async function saveFileInfo(fileId, fileName) {
  
    await database.saveFile({
      id: fileId,
      name: fileName
    });
  
  }
  
  // Database mock
  const database = {
    files: [],
  
    getFile(id) {
      return this.files.find(f => f.id === id); 
    },
  
    saveFile(file) {
      this.files.push(file);
    }
  };
  
  // Export functions
  module.exports = {
    download,
    getFileName
  };
  
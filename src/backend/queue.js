// Upload queue
const uploadQueue = [];

// Download queue 
const downloadQueue = [];

// Add upload task 
function addUploadTask(file) {
  uploadQueue.push({
    file,
    status: 'queued'
  });
}

// Add download task
function addDownloadTask(fileId) {
  downloadQueue.push({
    fileId, 
    status: 'queued' 
  });
}

// Process upload queue
async function processUploadQueue() {

    while(uploadQueue.length > 0) {
      const task = uploadQueue[0];
  
      try {
        // Upload file
        await uploadFile(task.file);  
  
        // Update task status
        task.status = 'completed';
  
      } catch(err) {
        // Upload failed
        task.status = 'failed';
        task.error = err;
      }
  
      // Remove from queue
      uploadQueue.shift(); 
    }
  
  }
  
  // Process download queue  
  async function processDownloadQueue() {
  
    while(downloadQueue.length > 0) {
      const task = downloadQueue[0];
  
      try {
        // Download file
        await downloadFile(task.fileId);
  
        // Update status
        task.status = 'completed';
  
      } catch(err) {
        // Download failed
        task.status = 'failed';
        task.error = err;
      }
  
      // Remove from queue 
      downloadQueue.shift();
    }
  
  }
  
  // Export functions
  module.exports = {
    addUploadTask,
    addDownloadTask,
    processUploadQueue,
    processDownloadQueue
  };
  
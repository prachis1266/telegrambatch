// Import Electron components 
import { Window, Menu, Dialog } from 'electron';

export default function App() {

  // State
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('No file selected');

  // File handlers
  const handleFileSelect = (file) => {

    if(!validateFile(file)) {
      return;
    }

    setSelectedFile(file);
    setStatus(`File selected: ${file.name}`);

  }

  const handleUpload = async () => {
    
    if(!selectedFile) {
      setStatus('No file selected');
      return;
    }

    setStatus('Uploading...');

    try {
      // Upload file with Electron
      await uploadFile(selectedFile);
      setStatus('Upload complete!');

    } catch(err) {
      setStatus('Upload failed!'); 
    }

  }

  // Render UI
  return (
    <Window>
      <Menu>
        <input type="file" onChange={(e) => handleFileSelect(e.target.files[0])}/>
        <button onClick={handleUpload}>Upload</button>
      </Menu>

      <div>{status}</div>

    </Window>
  );

}

// Validate file
function validateFile(file) {
  if(file.size > MAX_SIZE) {
    Dialog.showErrorBox('Error', 'File too large');
    return false;
  }

  if(!ALLOWED_TYPES.includes(file.type)) {
    Dialog.showErrorBox('Error', 'Invalid file type');
    return false;
  }

  return true;
}

// Upload file
async function uploadFile(file) {

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData
    });
    
    if(!response.ok) {
      throw new Error('Upload failed');
    }

  } catch(error) {
    console.log(error);
    Dialog.showErrorBox('Error', 'Upload failed');
  }

}

// Helper functions
function getFileSize(size) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  while (size >= 1024) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}

function getFileType(type) {
  const types = {
    'image/jpeg': 'JPEG Image',
    'image/png': 'PNG Image',
    'text/plain': 'Text File',
    'application/pdf': 'PDF Document'
  };

  return types[type] || 'Unknown';
}

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  while (bytes >= 1024) {
    bytes /= 1024;
    index++;
  }
  return `${bytes.toFixed(2)} ${units[index]}`;
}

// Mock data
const files = [
  {
    id: 1, 
    name: 'file1.jpg',
    type: 'image/jpeg',
    size: 2048
  },
  {
    id: 2,
    name: 'file2.pdf',
    type: 'application/pdf',
    size: 512000
  }
];

// Export helpers
export {
  getFileSize,
  getFileType,
  formatBytes
};

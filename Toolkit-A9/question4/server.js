const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();

// Set up the server to handle file uploads
const uploadDirectory = path.join(__dirname, 'uploads');

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Store files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Implement file versioning: append a timestamp to prevent overwriting
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const versionedFileName = `${baseName}-${Date.now()}${ext}`;
    cb(null, versionedFileName);
  },
});

// Filter to allow specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.docx', '.txt'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'));
  }
};

// Set file upload limits (e.g., 5 MB max file size)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter,
});

// API route to upload files
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({
    message: 'File uploaded successfully',
    fileName: req.file.filename,
  });
});

// API route to download files
app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(uploadDirectory, fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath); // Send file for download
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific error handling
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // General error handling
    return res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

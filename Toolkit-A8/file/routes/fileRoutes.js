const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, 'file-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable with file size and type limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images and PDFs Only!');
    }
  }
}).single('file');  

// Upload route
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: `uploads/${req.file.filename}`
    });
  });
});

module.exports = router;

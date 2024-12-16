// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize app
const app = express();
const port = 3000;

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Initialize upload
const upload = multer({ storage: storage });

// Middleware to serve static files (your frontend)
app.use(express.static('public'));

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // You can add more security checks here (e.g., validate file type, size, etc.)
    res.status(200).send('File uploaded successfully');
});

// Ensure upload directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

import express from 'express';
import upload from '../middleware/multerConfig.js';
import FileModel from '../models/FileModel.js'; // ✅ Mongoose model that includes `user`
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ Protects route and gives req.user

const router = express.Router();

// ✅ POST /api/docs/upload - Protected and saves user info
router.post('/upload', authMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // ✅ Optional: Debug log to verify user
    console.log('🔐 Uploading file for user:', req.user); // Should log { id: '...' }

    // ✅ Create new file document with user ID
    const newFile = new FileModel({
      user: req.user.id, // ✅ req.user.id is set by updated authMiddleware
      originalName: req.file.originalname,
      filename: req.file.filename,
      fileUrl: req.file.path, // Optional: Use file path as a reference
      uploadDate: new Date()
    });

    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ message: 'Server error while uploading' });
  }
});

export default router;

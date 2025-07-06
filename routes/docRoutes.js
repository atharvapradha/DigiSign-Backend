import express from 'express';
import upload from '../middleware/multerConfig.js';
import FileModel from '../models/FileModel.js';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ Protect route

const router = express.Router();

// ✅ POST /api/docs/upload - Protected route
router.post('/upload', authMiddleware, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // ✅ Debug: Log user ID
    console.log('🔐 Uploading file for user:', req.user); // Should show { id: '...' }

    // ✅ Save file info with user ID
    const newFile = new FileModel({
      user: req.user.id,
      originalName: req.file.originalname,
      filename: req.file.filename,
      fileUrl: req.file.path,
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

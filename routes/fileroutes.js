import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import FileModel from '../models/FileModel.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// ✅ GET: Fetch all files for the logged-in user
router.get('/files', authMiddleware, async (req, res) => {
  try {
    const files = await FileModel.find({ user: req.user.id });
    console.log('📁 Files fetched for user:', req.user.id, files);
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ✅ NEW: GET a specific file by ID and return the PDF blob
router.get('/files/:fileId', authMiddleware, async (req, res) => {
  try {
    const file = await FileModel.findOne({ _id: req.params.fileId, user: req.user.id });

    if (!file) {
      return res.status(404).json({ message: 'File not found or unauthorized' });
    }

    // Construct the full path to the file
    const filePath = path.join(process.cwd(), file.filename.startsWith('uploads')
      ? file.filename
      : `uploads/${file.filename}`);

    // ✅ Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on disk' });
    }

    // ✅ Send the file
    res.sendFile(filePath);
  } catch (err) {
    console.error('❌ Error serving file:', err);
    res.status(500).json({ message: 'Server Error while serving file' });
  }
});

// ✅ DELETE: Delete file by ID
router.delete('/files/:id', authMiddleware, async (req, res) => {
  try {
    const file = await FileModel.findOne({ _id: req.params.id, user: req.user.id });

    if (!file) {
      return res.status(404).json({ error: 'File not found or not authorized' });
    }

    // Delete file from uploads folder
    const filePath = path.join(process.cwd(), 'uploads', file.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn('⚠️ File not found on disk or already deleted:', filePath);
      } else {
        console.log('🗑 File removed from disk:', filePath);
      }
    });

    // Delete from DB
    await FileModel.deleteOne({ _id: req.params.id });

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting file:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;

import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String
    // Optional: Can include file path or accessible URL
  }
}, { timestamps: true }); // ✅ createdAt and updatedAt

export default mongoose.model('File', fileSchema);

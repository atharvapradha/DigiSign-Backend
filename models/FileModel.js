import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model (who uploaded the file)
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
  uploadDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Signed'],
    default: 'Pending'
  }
  // Add more fields if needed (e.g. file type, size)
});

const FileModel = mongoose.model('File', fileSchema);

export default FileModel;

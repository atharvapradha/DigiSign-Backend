import multer from 'multer'; 
// Import multer for handling multipart/form-data (used for file uploads)

import path from 'path'; 
// Import Node's path module to handle file paths and extensions

// 🔹 Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory where files will be saved
    // 'uploads/' is the folder where all uploaded files will go
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded file
    // We use Date.now() to add the current timestamp
    // path.extname(file.originalname) extracts the file extension (e.g. .pdf)
    cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
  }
});

// 🔹 Define file filter function to allow only PDFs
const fileFilter = (req, file, cb) => {
  // Check MIME type of file
  if (file.mimetype === 'application/pdf') {
    // If it's a PDF, accept the file (true)
    cb(null, true);
  } else {
    // If not a PDF, reject and send an error
    cb(new Error('Only PDF files allowed!'), false);
  }
};

// 🔹 Create the multer instance with the above config
const upload = multer({
  storage: storage,     // Use our custom storage config
  fileFilter: fileFilter // Use our custom file filter
});

// 🔹 Export the configured multer instance
export default upload;

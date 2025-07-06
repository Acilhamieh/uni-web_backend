import multer from 'multer';

// Configure memory storage for all file types
const storage = multer.memoryStorage();

// Define allowed file types
const allowedTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp',
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.ms-powerpoint', // .ppt
  'application/vnd.openxmlformats-officedocument.presentationml.presentation' // .pptx
]);

// Create the upload middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedTypes.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type: ' + file.mimetype));
    }
  },
  limits: {
    fileSize: 20 * 1024 * 1024 // 20 MB max
  }
});

export default upload;

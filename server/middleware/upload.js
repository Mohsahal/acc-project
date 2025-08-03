const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir;
    
    // Create subdirectories based on file type
    if (file.fieldname === 'tradeLicense') {
      uploadPath = path.join(uploadsDir, 'licenses');
    } else if (file.fieldname === 'agreement') {
      uploadPath = path.join(uploadsDir, 'agreements');
    } else if (file.fieldname === 'invoice') {
      uploadPath = path.join(uploadsDir, 'invoices');
    } else if (file.fieldname === 'document') {
      uploadPath = path.join(uploadsDir, 'documents');
    }
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and Office documents are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  }
});

// Specific upload configurations
const uploadSingle = upload.single('file');
const uploadMultiple = upload.array('files', 5);
const uploadFields = upload.fields([
  { name: 'tradeLicense', maxCount: 1 },
  { name: 'agreement', maxCount: 1 },
  { name: 'invoice', maxCount: 10 },
  { name: 'document', maxCount: 5 }
]);

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields
}; 
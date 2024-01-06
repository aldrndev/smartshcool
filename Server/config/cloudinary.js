const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
  console.log(
    'Cloudinary configuration is incomplete. Please check your environment variables'
  );
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pp-smartschool',
    format: 'jpg',
    public_id: (req, file) => 'file-' + Date.now(),
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept file
  } else {
    const error = new Error('file_type_profile');
    cb(error, false); // Reject file and pass the error
  }
};

const parser = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = parser;

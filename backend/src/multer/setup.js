const multer = require('multer');

// storage engine
// uploads folder is temporary storage, files uploaded here are deleted as soon as they are uploaded to AWS S3 bucket

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
const multer = require("multer");
const MIME_TYPES = {
  "cv/pdf": "pdf",
  "cv/word": "word",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, "fichiers");
  },
  filename: (req, file, callback) => {
    const name = Date.now() + file.originalname;

    callback(null, name);
  },
});
module.exports = multer({ storage }).single("cv");

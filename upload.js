const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;

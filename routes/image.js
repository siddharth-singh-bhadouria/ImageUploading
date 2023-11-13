const express = require("express");
const sharp = require("sharp");
const upload = require("../upload");
const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Resize and convert image
    const processedImage = await sharp(req.file.buffer)
      .resize(800, 800)
      .toFormat("webp")
      .toBuffer();

    // Store the processed image in MongoDB or on the server

    res.status(200).send("Image uploaded successfully");
  } catch (error) {
    res.status(500).send("Error processing image");
  }
});

module.exports = router;

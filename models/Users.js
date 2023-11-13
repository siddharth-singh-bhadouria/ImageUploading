const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  // Add other user fields as needed
});

module.exports = mongoose.model("User", userSchema);

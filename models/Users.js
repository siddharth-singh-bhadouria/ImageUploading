const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  // Add other user fields as needed
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

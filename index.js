const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/Users");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/image-uploading", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  session({ secret: "notagreatkey", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport setup
passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      // Implement user finding or creation logic here
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

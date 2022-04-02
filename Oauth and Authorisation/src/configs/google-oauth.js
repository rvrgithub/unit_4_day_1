const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/users.model");
const passport = require("passport");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
// console.log( process.env.GOOGLE_CLIENT_ID),
passport.use(new GoogleStrategy({
 
    clientID: process.env.GOOGLE_CLIENT_ID,
  
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5500/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken,refreshToken,profile)
    let user = await User.findOne({email : profile?._json?.email}).lean().exec()
    if(!user){
      user = await User.create({
          email : profile._json.email,
          password : uuidv4(), 
          role : ["customer"]
      })
  }

    return cb(null, user);
  }
));

module.exports = passport;
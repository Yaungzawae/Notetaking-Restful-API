const mongoose = require('mongoose');
const User = require('../model/userModel');
const passport = require('passport');

passport.use(User.createStrategy());

passport.serializeUser((user,done)=>{
  done(null,user.id);
})
passport.deserializeUser((id,done)=>{
  User.findById(id,(err, user)=>{
    done(err,user);
  })
})

module.exports = passport;

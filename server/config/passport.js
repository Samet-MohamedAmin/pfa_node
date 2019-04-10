const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Partner = require('../models/partner');
const Personal = require('../models/personal');

passport.use('student',new LocalStrategy({
  usernameField: 'email'
},
  (username, password, done) => {
    Student.findOne({ email: username }, (err, user) => {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

passport.use('teacher',new LocalStrategy({
    usernameField: 'email'
  },
    (username, password, done) => {
      Teacher.findOne({ email: username }, (err, user) => {
        if (err) { return done(err); }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  ));

  passport.use('personal',new LocalStrategy({
    usernameField: 'email'
  },
    (username, password, done) => {
      Personal.findOne({ email: username }, (err, user) => {
        if (err) { return done(err); }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  ));

  passport.use('partner',new LocalStrategy({
    usernameField: 'email'
  },
    (username, password, done) => {
      Partner.findOne({ email: username }, (err, user) => {
        if (err) { return done(err); }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  ));

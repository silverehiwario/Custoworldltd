//load bcrypt
var bCrypt = require("bcrypt-nodejs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function(passport, user) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  //LOCAL SIGNIN
  passport.use(
      new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with user_name
        usernameField: "user_name",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, user_name, password, done) {
        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(userpass, password);
        };

        db.User.findOne({ where: { user_name: user_name } })
          .then(function(user) {
            if (!user) {
              return done(null, false, { message: "Username does not exist" });
              console.log("Username does not exist");
            }

            if (!isValidPassword(password,user.password)) {
              return done(null, false, { message: "Incorrect password." });
            }

            var userinfo = user.get();
            return done(null, user);
          })
          .catch(function(err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with Signin"
            });
          });
      }
    )
  );
};


const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database/todo-database.db");

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/logged",
  passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {
    db.get(`SELECT * FROM Users WHERE googleId = "${profile.id}"`,
      (error, user) => {
        if (error) {
          console.log(error.message);
        } else if (!user) {
          db.run(`INSERT INTO Users (googleId, name) VALUES ("${profile.id}", "${profile.displayName}")`,
            (error) => {
              if (error) {
                console.log(error.message);
              } else {
                console.log("User created");
                return done(error, profile);
              }
            }
          );
        } else {
          return done(error, profile)
        }
      }
    )
  }
));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
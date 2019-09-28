const express = require("express");
const authRouter = express.Router();
const passport = require("../passport/passport");
const userRouter = require("./userRouter");

// passport.authenticate middleware is used here to authenticate the request
authRouter.get("/", passport.authenticate("google", {
  scope: ["profile"] // Used to specify the required data
}));

authRouter.get("/logged", passport.authenticate("google"), (req, res, next) => {
  if (!req.user) {
    console.log("Something went wrong");
    res.sendStatus(404);
  } else {
    console.log("Logged in as", req.user.given_name);
    // console.log("Req.user is: ", req.user)
    res.redirect(`http://localhost:3000/${req.user.id}`)
  }  
});

authRouter.get("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }
  });
  res.status(200).send("Session destroyed & user logged out");
});

module.exports = authRouter;
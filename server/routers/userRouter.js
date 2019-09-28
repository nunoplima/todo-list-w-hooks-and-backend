const express = require("express");
userRouter = express.Router();

// const isUserAuthenticated = (req, res, next) => {
//   if (req.user && req.params.displayName === req.user.given_name.toLowerCase()) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// }

// userRouter.get("/:displayName", isUserAuthenticated, (req, res, next) => {
//   res.status(200).send(`${req.user.displayName}'s private area`);
// })

userRouter.get("/", (req, res, next) => {
  console.log("getting user, useEffect()")
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.sendStatus(404);
  }
})

module.exports = userRouter;
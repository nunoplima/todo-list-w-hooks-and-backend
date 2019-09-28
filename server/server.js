const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const todosRouter = require("./routers/todosRouter");
const passport = require("./passport/passport");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

// Express Session
app.use(session({
  secret: "secret",
  saveUninitialized: true, // An uninitialized session is an unmodified one. When set to false, the session won’t be saved unless we modify it. It also won’t send the id back to the browser.
  resave: true, // false will not resave to the session store unless the session is modified. Modified means adding a property to req.session or changing a variable value.
  cookie: {maxAge: 1000 * 60 * 60 * 2} // 2 hours lifespan for the cookie
}));

// Passport init 
app.use(passport.initialize()); // initialize the passport session
app.use(passport.session()); // calls serializeUser and deserializeUser

const PORT = process.env.PORT || 3002

app.use("/auth/google", authRouter);
app.use("/user", userRouter);
app.use("/:userId/todos", todosRouter);

app.use(errorHandler());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
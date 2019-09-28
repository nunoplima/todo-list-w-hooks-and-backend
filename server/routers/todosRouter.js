const express = require("express");
const todosRouter = express.Router({ mergeParams: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database/todo-database.db");

todosRouter.get("/", (req, res, next) => {
  const query = `SELECT * FROM Users WHERE googleId = $googleId`
  const value = {$googleId: req.params.userId};
  db.get(query, value, (error, row) => {
    if (error) {
      next(error);
    } if (row) {
      res.status(200).send(row.todoArr)
    }
  })
})

todosRouter.post("/post", (req, res, next) => {
  const { todoArr } = req.body;
  const query = `UPDATE Users SET todoArr = $todoArr WHERE googleId = $googleId`;
  const values = { $todoArr: JSON.stringify(todoArr), $googleId: req.params.userId };
  db.run(query, values, (error) => {
    if (error) {
      next(error);
    } else {
      const newQuery = `SELECT * FROM Users WHERE googleId = $googleId`;
      const newValues = { $googleId: req.params.userId };
      db.get(newQuery, newValues, (error, row) => {
        if (error) {
          next(error);
        } else {
          res.status(200).send(row);
        }
      })
    }
  })
})

module.exports = todosRouter;
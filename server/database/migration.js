const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./todo-database.db");

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS Users`, (error) => console.log("Table Users dropped"));
  db.run(`CREATE TABLE Users (id INTEGER PRIMARY KEY NOT NULL, googleId TEXT NOT NULL, name TEXT NOT NULL, todoArr TEXT DEFAULT "[]")`, (error) => console.log("Table Users created"));
  // db.run(`DROP TABLE IF EXISTS Todos`, (error) => console.log("Table Todos dropped"));
  // db.run(`CREATE TABLE Todos (id INTEGER PRIMARY KEY NOT NULL, todoArr TEXT NOT NULL, userId TEXT NOT NULL, FOREIGN KEY (userId) REFERENCES Users(googleId))`, (error) => console.log("Table Todos created"));
});
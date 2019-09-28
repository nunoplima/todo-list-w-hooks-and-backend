const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./todo-database.db");

const activity1 = JSON.stringify([{activity: "Work for a bit :(", done: false}]);
const activity2 = JSON.stringify([{activity: "Workout :)", done: false}]);

db.serialize(() => {
  db.run(`INSERT INTO Users (googleId, name, todoArr) VALUES ("123", "Nuno", '${activity1}')`);
  db.run(`INSERT INTO Users (googleId, name, todoArr) VALUES ("456", "Lima", '${activity2}')`);
  // db.run(`INSERT INTO Todos (todoArr, userId) VALUES ('${activity1}', "123")`);
  // db.run(`INSERT INTO Todos (todoArr, userId) VALUES ('${activity2}', "456")`);
});
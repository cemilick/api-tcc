// Import DB Connection from db.js
var dbConn = require("./db");

// Create new Object, Task
var Task = function (todo) {
  this.name = todo.name;
  this.time = todo.time;
  this.status = todo.status ? todo.status : 0;
};

// Create new Task
Task.create = function (newTask, result) {
  dbConn.query("INSERT INTO task set ?", newTask, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

// Show all Task
Task.findAll = function (result) {
  dbConn.query("SELECT * FROM task", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Task : ", res);
      result(null, res);
    }
  });
};

// Find Task by Id
Task.findById = function (id, result) {
  dbConn.query("SELECT * FROM Task WHERE id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// Update Task
Task.update = function (id, Task, result) {
  dbConn.query(
    "UPDATE task SET name=?,time=?,status=? WHERE id = ?",
    [Task.name, Task.time, Task.status, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Delete Task
Task.delete = function (id, result) {
  dbConn.query("DELETE FROM Task WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Task;

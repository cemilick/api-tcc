const Task = require("./model");

exports.findAll = function (req, res) {
  Task.findAll(function (err, task) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", task);
    res.send(task);
  });
};

exports.create = function (req, res) {
  const new_task = new Task(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Task.create(new_task, function (err, task) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "task added successfully!",
        data: task,
      });
    });
  }
};

exports.findById = function (req, res) {
  Task.findById(req.params.id, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Task.update(req.params.id, new Task(req.body), function (err, task) {
      if (err) res.send(err);
      res.json({ error: false, message: "Task successfully updated" });
    });
  }
};

exports.delete = function (req, res) {
  Task.delete(req.params.id, function (err, task) {
    if (err) res.send(err);
    res.json({ error: false, message: "Task successfully deleted" });
  });
};

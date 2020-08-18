const mongoose = require('mongoose');
const Workflows = mongoose.model('Workflows');

// Create
module.exports.workflowCreate = function (req, res) {
  const newWorkflows = new Workflows(req.body);
  newWorkflows.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newWorkflows);
  });
}

// Read
module.exports.workflowRead = function (req, res) {
  Workflows
    .find()
    .exec(function (err, workflows) {
      if (err) throw err;
      res.status(200).json(workflows);
    });
}

module.exports.workflowId = function (req, res) {
  Workflows
    .findOne(req.params)
    .exec(function (err, workflow) {
      if (err) throw err;
      res.status(200).json(workflow);
    });
}

module.exports.workflowName = function (req, res) {
  Workflows
    .findOne( { name: req.params.name } )
    .exec(function (err, workflow) {
      if (err) throw err;
      res.status(200).json(workflow);
    });
}

// Update
module.exports.workflowUpdate = function (req, res) {
  Workflows
    .updateOne(req.params, req.body)
    .exec(function (err, workflow) {
      if (err) throw err;
      res.status(200).json(workflow);
    });
}

// Delete
module.exports.workflowDelete = function (req, res) {
  Workflows
    .findOneAndDelete({_id: req.params}, function (err, workflow) {
      if (err) throw err;
      res.status(200).json(workflow);
    });
}

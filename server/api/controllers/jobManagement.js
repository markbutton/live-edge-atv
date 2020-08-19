const mongoose = require('mongoose');
const JobManagement = mongoose.model('JobManagement');

// Create
module.exports.jobManagementCreate = function (req, res) {
  const newJobManagement = new JobManagement(req.body);
  newJobManagement.save(async err => {
    if (err) return res.status(500).send(err);
    req.app.io.sockets.emit('jobCreated', `Job ${newJobManagement.jobID} is created!`);
    return res.status(200).send(newJobManagement);
  });
}

module.exports.jobManagementUICreate = function (req, res) {
  const jm = new JobManagement();
  const newJobManagement = new JobManagement(req.body);
  newJobManagement._id = jm._id;
  JobManagement.create(newJobManagement, async (err, jm) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newJobManagement);
  });
}

// Read
module.exports.jobManagementRead = function (req, res) {
  JobManagement
    .find()
    .exec(function (err, jobManagements) {
      if (err) throw err;
      res.status(200).json(jobManagements);
    });
}

module.exports.jobManagementId = function (req, res) {
  JobManagement
    .findOne(req.params)
    .exec(function (err, jobManagement) {
      if (err) throw err;
      res.status(200).json(jobManagement);
    });
}

module.exports.jobManagementZone = function (req, res) {
  JobManagement
    .find(req.params)
    .exec(function (err, jobManagements) {
      if (err) throw err;
      res.status(200).json(jobManagements);
    });
}

// Update
module.exports.jobManagementUpdate = function (req, res) {
  JobManagement
    .updateOne(req.params, req.body)
    .exec(async function (err, jobManagement) {
      if (err) throw err;
      if (req.body.runStatus) {
        console.log('jmID:', req.params._id, '- Run status:', req.body.runStatus);
        req.app.io.emit('run-status-' + req.params._id, req.body.runStatus);
      }
      if (req.body.currentStatus) {
        console.log('jmID:', req.params._id, '- Current status:', req.body.currentStatus);
        req.app.io.emit('current-status-' + req.params._id, req.body.currentStatus);
      }

      res.status(200).json(jobManagement);
    });
}

module.exports.jobManagementUIUpdate = function (req, res) {
  JobManagement
    .updateOne(req.params, req.body)
    .exec(async function (err, jobManagement) {
      if (err) throw err;
      res.status(200).json(jobManagement);
    });
}

module.exports.jobManagementsUpdate = function (req, res) {
  var bulk = JobManagement.collection.initializeOrderedBulkOp();
  bulk.find(req.params).update({ $set: req.body });
  bulk.execute(function (err, jobManagement) {
    if (err) throw err;
    res.status(200).json(jobManagement);
  });
}

// Delete
module.exports.jobManagementDelete = function (req, res) {
  JobManagement
    .findOneAndDelete({ _id: req.params }, async function (err, jobManagement) {
      if (err) throw err;
      req.app.io.sockets.emit('jobDeleted', `Job ${jobManagement.jobID} is deleted!`);
      res.status(200).json(jobManagement);
    });
}

module.exports.jobManagementUIDelete = function (req, res) {
  JobManagement
    .findOneAndDelete({ _id: req.params }, async function (err, jobManagement) {
      if (err) throw err;
      res.status(200).json(jobManagement);
    });
}

// Read playing jm
module.exports.jobManagementPlaying = function (req, res) {
  JobManagement
    .find({ currentStatus: 'playing' }, { channelLineup: 0 })
    .exec(function (err, jobManagements) {
      if (err) throw err;
      res.status(200).json(jobManagements);
    });
}

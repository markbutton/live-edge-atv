const mongoose = require('mongoose');
const User = mongoose.model('User');
// const emailService = require('../controllers/email');

// Create
module.exports.userCreate = function (req, res) {
  const newUser = new User(req.body);
  newUser.save(err => {
    if (err) return res.status(500).send(err);
    // emailService.sendNotificationNewUser(newUser.name, newUser.email);
    return res.status(200).send(newUser);
  });
}

// Read
module.exports.userRead = function (req, res) {
  User
    .find({}, 'name email group')
    .exec(function (err, users) {
      if (err) throw err;
      res.status(200).json(users);
    });
}

module.exports.userId = function (req, res) {
  User
    .findOne(req.params, 'name email group')
    .exec(function (err, user) {
      if (err) throw err;
      res.status(200).json(user);
    });
}

module.exports.userName = function (req, res) {
  User
    .findOne({
      name: req.params.name
    })
    .exec(function (err, user) {
      if (err) throw err;
      res.status(200).json(user);
    });
}

module.exports.userEmail = function (req, res) {
  User
    .findOne({
      email: req.params.email
    })
    .exec(function (err, user) {
      if (err) throw err;

      res.status(200).json(user);
    });
}

// Update
module.exports.userUpdateGroup = function (req, res) {
  User
    .updateOne(req.params, {
      group: req.body.group
    })
    .exec(function (err, user) {
      if (err) throw err;
      res.status(200).json(user);
    });
}

// Delete
module.exports.userDelete = function (req, res) {
  User
    .findOneAndDelete({
      _id: req.params
    }, function (err, user) {
      if (err) throw err;
      res.status(200).json(user);
    });
}
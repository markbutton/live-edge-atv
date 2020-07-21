const mongoose = require('mongoose');
const UserGroup = mongoose.model('UserGroup');

// Create
module.exports.userGroupCreate = function (req, res) {
  const newUserGroup = new UserGroup(req.body);
  newUserGroup.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newUserGroup);
  });
}

// Read
module.exports.userGroupRead = function (req, res) {
  UserGroup
    .find()
    .exec(function (err, userGroups) {
      if (err) throw err;
      res.status(200).json(userGroups);
    });
}

module.exports.userGroupId = function (req, res) {
  UserGroup
    .findOne(req.params)
    .exec(function (err, userGroup) {
      if (err) throw err;
      res.status(200).json(userGroup);
    });
}

module.exports.userGroupName = function (req, res) {
  UserGroup
    .findOne( { name: req.params.name } )
    .exec(function (err, userGroup) {
      if (err) throw err;
      res.status(200).json(userGroup);
    });
}

// Update
module.exports.userGroupUpdate = function (req, res) {
  UserGroup
    .updateOne(req.params, req.body)
    .exec(function (err, userGroup) {
      if (err) throw err;
      res.status(200).json(userGroup);
    });
}

// Delete
module.exports.userGroupDelete = function (req, res) {
  UserGroup
    .findOneAndDelete({_id: req.params}, function (err, userGroup) {
      if (err) throw err;
      res.status(200).json(userGroup);
    });
}

const mongoose = require('mongoose');

const userGroupSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    unique: true
  }
});

mongoose.model('UserGroup', userGroupSchema, 'usergroups');
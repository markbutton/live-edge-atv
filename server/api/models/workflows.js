const mongoose = require('mongoose');

const workflowsSchema = new mongoose.Schema({
  name: {
    type: 'String'
  },
  nodes: {
    type: [
      'Mixed'
    ]
  },
  connections: {
    type: [
      'Mixed'
    ]
  }
});

mongoose.model('Workflows', workflowsSchema);
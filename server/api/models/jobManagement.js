const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const jobManagementSchema = new mongoose.Schema({
  zoneID: String,
  tmcID: String,
  jobID: Number,
  tmcJobID: String,
  recordJobId: String,
  slotID: String,
  currentStatus: String,
  runStatus: String,
  active: Boolean,
  currentNetwork: String,
  isHpe: Boolean,
  automate: Boolean,
  channelLineup: {
    type: 'Mixed'
  },
  networkList: {
    type: 'Mixed'
  },
  isCorrectZone: {
    type: String,
    default: 'uncheck'
  }
});
autoIncrement.initialize(mongoose.connection);
jobManagementSchema.plugin(autoIncrement.plugin, {
  model: 'JobManagement',
  field: 'jobID',
  startAt: 1,
  incrementBy: 1
});

mongoose.model('JobManagement', jobManagementSchema);

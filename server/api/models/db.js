const mongoose = require('mongoose');
let gracefulShutdown;
const dbURI = 'mongodb://localhost/atv';
const mongo_connection = process.env.MONGO_CONNECTION || dbURI;

mongoose.set('useCreateIndex', true);
mongoose.connect(mongo_connection, {
  useNewUrlParser: true
});

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ', mongo_connection);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./users');
require('./userGroup');
require('./workflows');
require('./jobManagement');
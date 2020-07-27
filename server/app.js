const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');

// [SH] Bring in the data model
require('./api/models/db');
// [SH] Bring in the routes for the API (delete the default routes)
const routesApi = require('./api/routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);

module.exports = app;

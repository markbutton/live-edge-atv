'use strict';

var fs = require('fs');
var eq = JSON.parse(fs.readFileSync('./collections/equipment.json', 'utf8'));
var wf = JSON.parse(fs.readFileSync('./collections/workflows.json', 'utf8'));
var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.dropCollection('equipment');
  db.createCollection('equipment');
  db.insert('equipment', eq);
  db.dropCollection('workflows');
  db.createCollection('workflows');
  db.insert('workflows', wf);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};

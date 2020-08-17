const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');
const ctrlUser = require('../controllers/user');
const ctrlUserGroup = require('../controllers/userGroup');
const ctrlWorkflow = require('../controllers/workflow');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// user
router.post('/users', ctrlUser.userCreate);
router.get('/users', ctrlUser.userRead);
router.get('/users/:_id', ctrlUser.userId);
router.get('/users/name/:name', ctrlUser.userName);
router.get('/users/email/:email', ctrlUser.userEmail);
router.put('/users/group/:_id', ctrlUser.userUpdateGroup);
router.delete('/users/:_id', ctrlUser.userDelete);

// user group
router.post('/user-groups', ctrlUserGroup.userGroupCreate);
router.get('/user-groups', ctrlUserGroup.userGroupRead);
router.get('/user-groups/:_id', ctrlUserGroup.userGroupId);
router.get('/user-groups/name/:name', ctrlUserGroup.userGroupName);
router.put('/user-groups/:_id', ctrlUserGroup.userGroupUpdate);
router.delete('/user-groups/:_id', ctrlUserGroup.userGroupDelete);

// workflow
router.post('/workflow', ctrlWorkflow.workflowCreate);
router.get('/workflow', ctrlWorkflow.workflowRead);
router.get('/workflow/:_id', ctrlWorkflow.workflowId);
router.get('/workflow/name/:name', ctrlWorkflow.workflowName);
router.put('/workflow/:_id', ctrlWorkflow.workflowUpdate);
router.delete('/workflow/:_id', ctrlWorkflow.workflowDelete);

module.exports = router;
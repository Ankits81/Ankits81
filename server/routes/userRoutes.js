const express = require('express');
const router = express.Router();
const { createUsers, claimPoints, getRankings, getAllUsers, addUser } = require('../controllers/userController');

module.exports = (io) => {
  router.post('/create-users', createUsers);
  router.post('/claim/:userId', (req, res) => claimPoints(req, res, io));
  router.get('/rankings', getRankings);
  router.get('/users', getRankings);
  router.get('/users',getAllUsers);
  router.post('/add-user',addUser)
  return router;
};

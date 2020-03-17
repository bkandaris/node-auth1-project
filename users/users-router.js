const express = require('express');
const Users = require('./users-model');
// import restrict()
const { sessions, restrict } = require('../middleware/restrict');

const router = express.Router();
// adding restrict middleware
router.get('/', restrict(), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

module.exports = router;

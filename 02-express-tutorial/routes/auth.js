const express = require('express');
const router = express.Router();

const {authentication} = require('../controllers/auth');

// router: /login

// I get the data from database or wherever, and here you are as API!
router.post('/', authentication);

module.exports = router;
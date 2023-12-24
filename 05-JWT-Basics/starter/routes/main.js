const express = require('express');
const router = express.Router();

const {login, dashboard} = require('../controllers/main');

const authMiddleware = require('../middleware/auth'); // middleware

router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware, dashboard); // first argument sets middleware
// Important:
// now, everytime someone is going to be hitting this route, first they will go through the middleware [authMiddleware]
// of course, in middleware since I have next(), then I'll pass to the dashboard.

module.exports = router;
const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/',homeController.homePage);
router.use('/user',require('./user'));

module.exports = router;
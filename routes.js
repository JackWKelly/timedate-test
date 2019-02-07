const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/hello', controller.hello);

router.get('/gettime', controller.getTime);

module.exports = router;
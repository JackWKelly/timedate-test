const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/hello', controller.hello);

module.exports = router;
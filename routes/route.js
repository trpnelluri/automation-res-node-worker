'use strict'

const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.get('/', controller.default);

router.get('/get-response', controller.getResponse);

router.delete('/delete-file', controller.deleteFile);

module.exports = router;
'use strict'

const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.get('/', controller.default);

router.get('/esmd/automation/get-object-response', controller.getResponseXMLData);

router.get('/esmd/automation/delete-object', controller.deleteObject);

module.exports = router;
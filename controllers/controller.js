'use strict'

const loggerUtils = require('../sharedLib/common/logger-utils');
const EventName = 'CONTROLLER'

const logger = loggerUtils.customLogger( EventName, {});
exports.default = (req, res) => {
    logger.info(`default, req.headers: ${JSON.stringify(req.headers)}`)
    res.send('Welcome to Unissant');
};

exports.getResponse = (req, res) => {
    logger.info(`getResponse, req.headers: ${JSON.stringify(req.headers)}`)
    res.send('Welcome to Unissant');
};

exports.deleteFile = (req, res) => {
    logger.info(`deleteFile, req.headers: ${JSON.stringify(req.headers)}`)
    res.send('Welcome to Unissant');
};

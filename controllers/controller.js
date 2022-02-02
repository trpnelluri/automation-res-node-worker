'use strict'

const loggerUtils = require('../sharedLib/common/logger-utils');
const PopulateKeyName = require('../services-utils/populate-keyname')
const ResponseFromS3 = require('../services/get-response-from-s3')
const XMLService = require('../sharedLib/common/xml-service')

const EventName = 'CONTROLLER'

const logger = loggerUtils.customLogger( EventName, {});
exports.default = async(req, res) => {
    logger.info(`default, req.headers: ${JSON.stringify(req.headers)}`)
    res.send('Welcome to Unissant');
};

exports.getResponse = async (req, res) => {
    logger.info(`getResponse, req.headers: ${JSON.stringify(req.headers)}`)
    //const transId = req.headers.transaction_id
    //const uniqueKey = req.headers.unique_key
    const keyName = await PopulateKeyName.populateKeyName(req)
    logger.info(`getResponse, keyName ${keyName}`)
    let response = await ResponseFromS3.fetchJSONObjFromS3(keyName)
    logger.info(`getResponse, response ${response}`)
    let xmlService = XMLService.getInstance();
    let responseJson = await xmlService.convertToJson(response);
    logger.info(`responseJson: ${responseJson}`);
    res.status(200).send(responseJson);
};

exports.deleteFile = async(req, res) => {
    logger.info(`deleteFile, req.headers: ${JSON.stringify(req.headers)}`)
    res.send('Welcome to Unissant');
};

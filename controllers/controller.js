'use strict'

const loggerUtils = require('../sharedLib/common/logger-utils');
const PopulateKeyName = require('../services-utils/populate-keyname')
const PopulateResXml = require('../services-utils/populate-response-xml')
const ResponseFromS3 = require('../services/get-object-data-from-s3')
const DelFileFromS3 = require('../services/delete-object-from-s3')

const EventName = 'CONTROLLER'
const SUCCESS = '1000'
const FILENOTFOUND = '1001'
const SUBMISSIONUNIDISINVALID = '1002'
const ESMDTRANSIDISINVALID = '1003'
const HEADERDATAISINVALID = '1004'

let logger = loggerUtils.customLogger( EventName, {});

exports.default = async(req, res) => {
    logger.info(`default, req.headers: ${JSON.stringify(req.headers)}`)
    res.send('Welcome to Unissant');
};

exports.getResponseXMLData = async (req, res) => {
    logger.info(`getResponseXMLData, req.headers: ${JSON.stringify(req.headers)}`)
    const action = 'GET'
    let subUnid = '-'
    if ( req.headers.submsnuniqid !== undefined && req.headers.submsnuniqid !== '' && req.headers.submsnuniqid !== null) {
        subUnid = req.headers.submsnuniqid
    }
    let esmdTransID = '-'
    if ( req.headers.esmdtransid !== undefined && req.headers.esmdtransid !== '' && req.headers.esmdtransid !== null) {
        esmdTransID = req.headers.esmdtransid
    }
    const headerData = subUnid + '_' + esmdTransID
    let logParams = {globaltransid: esmdTransID}
    logger = loggerUtils.customLogger( EventName, logParams);
    if ( subUnid !== '-' && esmdTransID !== '-' ) {
        logger.info(`getResponseXMLData, ${headerData}`)
        const keyName = await PopulateKeyName.populateKeyName(subUnid, esmdTransID)
        logger.info(`getResponseXMLData, keyName ${keyName}`)
        if (keyName) {
            ResponseFromS3.fetchXMLDataFromS3(esmdTransID, keyName, function(err, response ){
                logger.debug(`getResponseXMLData, response ${response} `)
                if (err) {
                    PopulateResXml.populateResponseXml(res, action, FILENOTFOUND, logger, headerData, null)
                } else {
                    PopulateResXml.populateResponseXml(res, action, SUCCESS, logger, headerData, response)
                }
            })
        } else {
            PopulateResXml.populateResponseXml(res, action, SUBMISSIONUNIDISINVALID, logger, headerData, null)
        }
    } else {
        if ( subUnid === '-' && esmdTransID === '-') {
            PopulateResXml.populateResponseXml(res, action, HEADERDATAISINVALID, logger, headerData, null)
        } else if ( esmdTransID === '-') {
            PopulateResXml.populateResponseXml(res, action, ESMDTRANSIDISINVALID, logger, esmdTransID, null)
        } else {
            PopulateResXml.populateResponseXml(res, action, SUBMISSIONUNIDISINVALID, logger, subUnid, null)
        }
    }
};

exports.deleteObject = async(req, res) => {
    logger.info(`deleteObject, req.headers: ${JSON.stringify(req.headers)}`)
    const action = 'DELETE'
    let subUnid = '-'
    if ( req.headers.submsnuniqid !== undefined && req.headers.submsnuniqid !== '' && req.headers.submsnuniqid !== null) {
        subUnid = req.headers.submsnuniqid
    }
    let esmdTransID = '-'
    if ( req.headers.esmdtransid !== undefined && req.headers.esmdtransid !== '' && req.headers.esmdtransid !== null) {
        esmdTransID = req.headers.esmdtransid
    }
    const headerData = subUnid + '_' + esmdTransID
    let logParams = {globaltransid: esmdTransID}
    logger = loggerUtils.customLogger( EventName, logParams);
    logger.info(`deleteObject, headerData ${headerData}`)
    if ( subUnid !== '-' && esmdTransID !== '-' ) {
        const headerData = subUnid + '_' + esmdTransID
        const keyName = await PopulateKeyName.populateKeyName(subUnid, esmdTransID)
        logger.info(`deleteObject, keyName ${keyName}`)
        if (keyName) {
            DelFileFromS3.deleteObjFromS3(esmdTransID, keyName, function(err, objectDeleteFlag ){
                logger.debug(`deleteObject, response ${objectDeleteFlag} `)
                if (err) {
                    PopulateResXml.populateResponseXml(res, action, FILENOTFOUND, logger, headerData, null)
                } else {
                    PopulateResXml.populateResponseXml(res, action, SUCCESS, logger, headerData, null)
                }
            })
        } else {
            PopulateResXml.populateResponseXml(res, action, SUBMISSIONUNIDISINVALID, logger, headerData, null)
        }
    } else {
        if ( subUnid === '-' && esmdTransID === '-') {
            PopulateResXml.populateResponseXml(res, action, HEADERDATAISINVALID, logger, headerData, null)
        } else if ( esmdTransID === '-') {
            PopulateResXml.populateResponseXml(res, action, ESMDTRANSIDISINVALID, logger, esmdTransID, null)
        } else {
            PopulateResXml.populateResponseXml(res, action, SUBMISSIONUNIDISINVALID, logger, subUnid, null)
        }
    }
};

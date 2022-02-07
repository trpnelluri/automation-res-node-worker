'use strict'

const loggerUtils = require('../sharedLib/common/logger-utils');
const PopulateKeyName = require('../services-utils/populate-keyname')
const PopulateResXml = require('../services-utils/populate-response-xml')
const ResponseFromS3 = require('../services/get-object-data-from-s3')
const DelFileFromS3 = require('../services/delete-object-from-s3')

const EventName = 'CONTROLLER'
const SUCCESS = '1000'
const FILENOTFOUND = '1001'
const SUBUNIDISINVALID = '1002'

const logger = loggerUtils.customLogger( EventName, {});

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
    logger.info(`getResponseXMLData, subUnid ${subUnid}`)
    const keyName = await PopulateKeyName.populateKeyName(subUnid)
    logger.info(`getResponseXMLData, keyName ${keyName}`)
    if (keyName) {
        ResponseFromS3.fetchXMLDataFromS3(subUnid, keyName, function(err, response ){
            logger.debug(`getResponseXMLData, response ${response} `)
            if (err) {
                PopulateResXml.populateResponseXml(res, action, FILENOTFOUND, logger, subUnid, null)
            } else {
                PopulateResXml.populateResponseXml(res, action, SUCCESS, logger, subUnid, response)
            }
        })
    } else {
        PopulateResXml.populateResponseXml(res, action, SUBUNIDISINVALID, logger, subUnid, null)
    }
};

exports.deleteObject = async(req, res) => {
    logger.info(`deleteObject, req.headers: ${JSON.stringify(req.headers)}`)
    const action = 'DELETE'
    let subUnid = '-'
    if ( req.headers.submsnuniqid !== undefined && req.headers.submsnuniqid !== '' && req.headers.submsnuniqid !== null) {
        subUnid = req.headers.submsnuniqid
    }
    logger.info(`deleteObject, subUnid ${subUnid}`)
    const keyName = await PopulateKeyName.populateKeyName(subUnid)

    logger.info(`deleteObject, keyName ${keyName}`)
    if (keyName) {
        DelFileFromS3.deleteObjFromS3(subUnid, keyName, function(err, objectDeleteFlag ){
            logger.debug(`deleteObject, response ${objectDeleteFlag} `)
            if (err) {
                PopulateResXml.populateResponseXml(res, action, FILENOTFOUND, logger, subUnid, null)
            } else {
                PopulateResXml.populateResponseXml(res, action, SUCCESS, logger, subUnid, null)
            }
        })
    } else {
        PopulateResXml.populateResponseXml(res, action, SUBUNIDISINVALID, logger, subUnid, null)
    }
};

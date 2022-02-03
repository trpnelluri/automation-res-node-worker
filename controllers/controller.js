'use strict'

const loggerUtils = require('../sharedLib/common/logger-utils');
const PopulateKeyName = require('../services-utils/populate-keyname')
const PopulateResXml = require('../services-utils/populate-response-xml')
const ResponseFromS3 = require('../services/get-response-from-s3')
const XMLService = require('../sharedLib/common/xml-service')

const SUCCESS = '1000'
const FILENOTFOUND = '1001'
const SUBUNIDISINVALID = '1002'
const EventName = 'CONTROLLER'

const logger = loggerUtils.customLogger( EventName, {});
exports.default = async(req, res) => {
    logger.info(`default, req.headers: ${JSON.stringify(req.headers)}`)
    res.send('Welcome to Unissant');
};

exports.getResponse = async (req, res) => {
    logger.info(`getResponse, req.headers: ${JSON.stringify(req.headers)}`) 
    let subUnid = '-'
    if ( req.headers.SUBMSNUNIQID !== undefined && req.headers.SUBMSNUNIQID !== '' && req.headers.SUBMSNUNIQID !== null) {
        const submissionUnid = req.headers.SUBMSNUNIQID
    }
    //subUnid ='SD091048T1000711626185602255'
    subUnid = 'SD091048T_1000711626185602255'
    logger.info(`getResponse, subUnid ${subUnid}`)
    const keyName = await PopulateKeyName.populateKeyName(subUnid)
    logger.info(`getResponse, keyName ${keyName}`)
    if (keyName) {
        //let response = await ResponseFromS3.fetchXMLDataFromS3(subUnid, keyName)
        ResponseFromS3.fetchXMLDataFromS3(subUnid, keyName, function(err, response ){
            logger.info(`getResponse, response ${response}`)
            if (err) {
                //const errResXml = PopulateResXml.populateResponseXml(subUnid, logger)
                //res.status(400).contentType('application/xml').send(errResXml); 
                PopulateResXml.populateResponseXml(res, FILENOTFOUND, logger, subUnid, null)
            } else {
                // res
                // .status(200)
                // .contentType('application/xml')
                // .send(response);
                PopulateResXml.populateResponseXml(res, SUCCESS, logger, subUnid, response)
            }
        })

    } else {
        //const errResXml = await PopulateErrResXml.populateErrorResXml(subUnid, logger)
        //res.status(400).contentType('application/xml').send(errResXml); 
        PopulateResXml.populateResponseXml(res, SUBUNIDISINVALID, logger, subUnid, null)
    }
    
    // keyName.then(async () => {
    //     console.log("Promise Resolved");
       
    // }).catch(function () {
    //     console.log("Promise Rejected");
    // });
    //logger.info(`getResponse, keyName ${keyName}`)
    
    //const xmlResponse = parseXML(response)
    //logger.info(`xmlResponse, xmlResponse ${xmlResponse}`)
    //res.status(200).send(response);
    //res.header('contentType', 'application/xml').send(response)

    //let xmlService = XMLService.getInstance();
    //let responseJson = await xmlService.convertToJson(response);
    //logger.info(`responseJson: ${responseJson}`);
    //res.status(200).send(responseJson);
    
};

exports.deleteFile = async(req, res) => {
    logger.info(`deleteFile, req.headers: ${JSON.stringify(req.headers)}`)
    res.send('Welcome to Unissant');
};

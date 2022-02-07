'use strict'

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const loggerUtils = require('../sharedLib/common/logger-utils');
const bucket = process.env.bucketname;
const EventName = 'GET_XMLDATA_FROM_S3'

exports.fetchXMLDataFromS3 = function (subUnid, objectKey, callback){
    let logParams = {globaltransid: subUnid}
    let logger = loggerUtils.customLogger( EventName, logParams);
    let strData = 'null'
    const params = {
        Bucket: bucket,
        Key: objectKey
    }
    logger.info (`fetchXMLDataFromS3, AWS S3 getObject params: ${JSON.stringify(params)}`)

    s3.getObject(params, function (err, data) {
        if (err) {
            logger.error('fetchXMLDataFromS3, getObject error occurred: ' + JSON.stringify(err.stack));
            callback('File Not Found', strData)
        } else {
            logger.debug('fetchXMLDataFromS3, Object retrevied successfully from s3')
            strData = data.Body.toString('utf-8');
            logger.debug(`fetchXMLDataFromS3, strData: ${strData}`);
            callback(null, strData)
        }
    })
}
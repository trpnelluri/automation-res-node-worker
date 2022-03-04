'use strict'

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const loggerUtils = require('../sharedLib/common/logger-utils');
const bucket = process.env.bucketname;
const EventName = 'GET_XMLDATA_FROM_S3'

exports.fetchXMLDataFromS3 = function (esmdTransID, objectKey, callback){
    let logParams = {globaltransid: esmdTransID}
    let logger = loggerUtils.customLogger( EventName, logParams);
    let strData = 'null'
    const listObjParams = {
        Bucket: bucket,
        Prefix: objectKey
    }
    logger.info (`fetchXMLDataFromS3, AWS S3 listObjParams: ${JSON.stringify(listObjParams)}`)
    s3.listObjectsV2(listObjParams, function (err, data) {
        if (err) {
            logger.error('fetchXMLDataFromS3, getObject error occurred: ' + JSON.stringify(err.stack));
            callback('File Not Found', strData)
        } else {
            logger.debug('fetchXMLDataFromS3, Object retrevied successfully from s3')
            logger.debug(`fetchXMLDataFromS3, strData: ${data}`);
            let contents = data.Contents;
            let strData = ''
            let noOfObject = contents.length
            logger.debug(`fetchXMLDataFromS3, noOfObject: ${noOfObject}`);
            if ( noOfObject > 0 ) {
                contents.forEach(function (content) {
                    logger.debug(`fetchXMLDataFromS3, content.Key: ${content.Key}`);
                    let keyFromS3 = content.Key
                    const params = {
                        Bucket: bucket,
                        Key: keyFromS3
                    }
                    logger.info (`fetchXMLDataFromS3, AWS S3 getObject params: ${JSON.stringify(params)}`)
                    s3.getObject(params, function (err, data) {
                        if (err) {
                            logger.error('fetchXMLDataFromS3, getObject error occurred: ' + JSON.stringify(err.stack));
                            callback('File Not Found', strData)
                        } else {
                            logger.debug('fetchXMLDataFromS3, Object retrevied successfully from s3')
                            if ( strData !== '' ) {
                                strData = strData + '<br>'
                            }
                            strData += data.Body.toString('utf-8');
                            logger.debug(`fetchXMLDataFromS3, strData: ${strData}`);
                            callback(null, strData)
                        }
                    })
                })
            } else {
                callback('File Not Found', null)
            }
            
        }
    });
}
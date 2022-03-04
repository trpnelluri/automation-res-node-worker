'use strict'

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const loggerUtils = require('../sharedLib/common/logger-utils');
const bucket = process.env.bucketname;
const EventName = 'DELETE_OBJ_FROM_S3'

exports.deleteObjFromS3 = function (esmdTransID, objectKey, callback){
    let logParams = {globaltransid: esmdTransID}
    let logger = loggerUtils.customLogger( EventName, logParams);
    let objectDeleteFlag = false;
    const listObjParams = {
        Bucket: bucket,
        Prefix: objectKey
    }
    logger.info (`deleteObjFromS3, AWS S3 getObject params: ${JSON.stringify(listObjParams)}`)
    s3.listObjectsV2(listObjParams, function (err, data) {
        if (err) {
            logger.error('deleteObjFromS3, listObjectsV2 error occurred: ' + JSON.stringify(err.stack));
            callback('File Not Found', objectDeleteFlag)
        } else {
            logger.info(`deleteObjFromS3, Available Objects in s3 data: ${data}`)
            let contents = data.Contents;
            //TBD: need to revist this code if we have multiple files with different extention
            //EX: DLEFT.xml, VALDTN.xml and PICKUP.xml
            contents.forEach(function (content) {
                logger.debug(`deleteObjFromS3, content.Key: ${content.Key}`);
                let keyFromS3 = content.Key
                const deleteObjParams = {
                    Bucket: bucket,
                    Key: keyFromS3
                }
                logger.info (`deleteObjFromS3, AWS S3 deleteObjParams: ${JSON.stringify(deleteObjParams)}`)
                s3.deleteObject(deleteObjParams, function(err, dataDelete) {
                    if (err) {
                        logger.error('deleteObjFromS3, Delete object error occurred: ' + JSON.stringify(err.stack));
                        callback('File Not Found', objectDeleteFlag)
                    } else {
                        logger.info(`deleteObjFromS3, Object deleted successfully from s3. data: ${JSON.stringify(dataDelete)}`)
                        objectDeleteFlag = true
                        callback(null, objectDeleteFlag)
                    }
                })
            })
        }
    });
}

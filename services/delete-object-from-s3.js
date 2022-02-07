'use strict'

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const loggerUtils = require('../sharedLib/common/logger-utils');
const bucket = process.env.bucketname;
const EventName = 'DELETE_OBJ_FROM_S3'

exports.deleteObjFromS3 = function (subUnid, objectKey, callback){
    let logParams = {globaltransid: subUnid}
    let logger = loggerUtils.customLogger( EventName, logParams);
    let objectDeleteFlag = false;
    const deleteObjParams = {
        Bucket: bucket,
        Key: objectKey
    }
    logger.info (`deleteObjFromS3, AWS S3 getObject params: ${JSON.stringify(deleteObjParams)}`)

    s3.headObject(deleteObjParams, function (err, metadata) {
        if (err) {
            logger.error('deleteObjFromS3, objectExists : ' + JSON.stringify(err.stack));
            callback('File Not Found', objectDeleteFlag)
        } else {

            logger.debug(`deleteObjFromS3, Object is available in s3 for delete. data: ${JSON.stringify(metadata)}`)
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
        }

    });

}

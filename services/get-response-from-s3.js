'use strict'

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const loggerUtils = require('../sharedLib/common/logger-utils');
const environment = process.env.environment
const bucket = environment + '-' + process.env.bucketnamecommon;
const EventName = 'XMLDATA_FROM_S3'

exports.fetchXMLDataFromS3 = function (subUnid, objectKey, callback){
    //return new Promise((resolve, reject) => {
        // let logParams = {globaltransid: subUnid}
        // let logger = loggerUtils.customLogger( EventName, logParams);
        // objectKey +=1 
        // const params = {
        //     Bucket: bucket,
        //     Key: objectKey
        // }
        // logger.info (`fetchXMLDataFromS3, AWS S3 getObject params: ${JSON.stringify(params)}`)
        // const data = await s3.getObject(params).promise();
        // let strData = data.Body.toString('utf-8');
        // console.log('0: ' + strData)
        // return strData
        //resolve(strData)
    //}).catch((error) => {
        //logger.error(`populateKeyName, ERROR: subUnid received is invalid: ${error}` )
    //});
    
        let logParams = {globaltransid: subUnid}
        let logger = loggerUtils.customLogger( EventName, logParams);
        //objectKey +=1 
        let strData = 'null'
        const params = {
            Bucket: bucket,
            Key: objectKey
        }
        logger.info (`fetchXMLDataFromS3, AWS S3 getObject params: ${JSON.stringify(params)}`)

        s3.getObject(params, function (err, data) {
            if (err) {
				logger.error("fetchXMLDataFromS3, getObject error occurred: " + JSON.stringify(err.stack));
                callback('File Not Found', strData)
			} else {
				logger.debug('fetchXMLDataFromS3, Object retrevied successfully from s3')
                strData = data.Body.toString('utf-8');
				logger.debug(`fetchXMLDataFromS3, strData: ${strData}`);
                callback(null, strData)
			}
        })
        //   let strData = response.Body.toString('utf-8');
        //   return strData

        // const data = await s3.getObject(params).promise();
        // let strData = data.Body.toString('utf-8');
        // console.log('0: ' + strData)
        // return strData
            
    // } catch (e) {
    //     throw new Error(`Could not retrieve file from S3: ${e.stack}`)
    // }
    
}
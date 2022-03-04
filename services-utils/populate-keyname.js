'use strict'

const loggerUtils = require('../sharedLib/common/logger-utils');
const separator = '_'
const EventName = 'POPULATE_KEYNAME'

async function populateKeyName(subUnid, esmdTransID) {
    let logParams = {globaltransid: esmdTransID}
    const logger = loggerUtils.customLogger( EventName, logParams);
    
    return new Promise((resolve, reject) => {
        logger.info(`populateKeyName, subUnid: ${subUnid} esmdTransID ${esmdTransID}` )
        const fileNameStart = process.env.dleftfilenamestart
        let subUnidArray = subUnid.split('_');
            
        if ( subUnidArray.length <= 1 ) {
            logger.error(`populateKeyName, ERROR: subUnid received is invalid: ${subUnid}` )
            throw new Error('subUnid is invalid.');
        }
        const folderName = subUnidArray[0]
        const fileName = fileNameStart + separator + subUnid + separator + esmdTransID + separator
        const finalKeyNameInS3 = `${folderName}/${fileName}`
        logger.info(`populateKeyName, FileName: ${fileName} finalKeyNameInS3: ${finalKeyNameInS3}` )
        resolve(finalKeyNameInS3)

    }).catch((error) => {
        logger.error(`populateKeyName, ERROR: subUnid received is invalid: ${error}` )
    });
}

module.exports = {
    populateKeyName,
};
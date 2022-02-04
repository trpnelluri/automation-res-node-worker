'use strict'

async function populateResponseXml(res, action, status, logger, subUnid, response) {

    logger.info(`populateResponseXml, action ${action} status ${status} subUnid ${subUnid}`)

    if ( response === null ) {
        let xmlFile = '<?xml version="1.0" encoding="UTF-8"?>';
        if ( action === 'DELETE' && status === '1000' ) {
            xmlFile += '<Status>';
            xmlFile += '<StatusCode>SUCCESS</StatusCode>';
            xmlFile += '<StatusSubject>SUCCESS</StatusSubject>';
            xmlFile += '<StatusMessage>'+`Object with SUBMSNUNIQID ${subUnid} has been Successfully deleted from s3`+'</StatusMessage>';
            xmlFile += '</Status>';
            response = xmlFile
        } else {
            let statusMessage = 'null' 
            xmlFile += '<Status>';
            xmlFile += '<StatusCode>ERROR</StatusCode>';
            xmlFile += '<StatusSubject>ERROR</StatusSubject>';
            if ( status === '1001') {
                statusMessage = `Object Not Found for SUBMSNUNIQID ${subUnid}`
            } else if (status === '1002') {
                statusMessage = `SUBMSNUNIQID ${subUnid} is Invalid`
            }
            xmlFile += '<StatusMessage>' + ` ${statusMessage} ` + '</StatusMessage>';
            xmlFile += '</Status>';
            response = xmlFile
        }
    }
   
    logger.info(`populateResponseXml, response ${response}`)
     res
        .contentType('application/xml')
        .send(response);
}

module.exports = {
    populateResponseXml,
};
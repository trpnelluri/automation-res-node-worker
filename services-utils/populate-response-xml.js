'use strict'

async function populateResponseXml(res, action, status, logger, headerData, response) {

    logger.info(`populateResponseXml, action ${action} status ${status} subUnid ${headerData}`)

    if ( response === null ) {
        let xmlFile = '<?xml version="1.0" encoding="UTF-8"?>';
        if ( action === 'DELETE' && status === '1000' ) {
            xmlFile += '<Status>';
            xmlFile += '<StatusCode>SUCCESS</StatusCode>';
            xmlFile += '<StatusSubject>SUCCESS</StatusSubject>';
            xmlFile += '<StatusMessage>' + `Object with HEADERDATA ${headerData} has been Successfully deleted from s3` + '</StatusMessage>';
            xmlFile += '</Status>';
            response = xmlFile
        } else {
            let statusMessage = 'null'
            xmlFile += '<Status>';
            xmlFile += '<StatusCode>ERROR</StatusCode>';
            xmlFile += '<StatusSubject>ERROR</StatusSubject>';
            if ( status === '1001') {
                statusMessage = `Object Not Found for HEADERDATA ${headerData}`
            } else if (status === '1002') {
                if (headerData === '-') {
                    headerData = ''
                }
                statusMessage = `SUBMSNUNIQID ${headerData} is Invalid`
            } else if (status === '1003') {
                if (headerData === '-') {
                    headerData = ''
                }
                statusMessage = `ESMDTRANSID ${headerData} is Invalid`
            } else if (status === '1004') {
                if (headerData === '-_-') {
                    headerData = ''
                }
                statusMessage = `Header Data ${headerData} is Invalid`
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
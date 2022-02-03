'use strict'

async function populateResponseXml(res, status, logger, subUnid, response) {

    logger.info(`populateResponseXml, status ${status} subUnid ${subUnid}`)

    let xmlFile = '<?xml version="1.0" encoding="UTF-8"?>';
    xmlFile += '<Status>';
    xmlFile += '<StatusCode>ERROR</StatusCode>';
    xmlFile += '<StatusSubject>ERROR</StatusSubject>';
    if ( status === '1001') {
        xmlFile += '<StatusMessage>Object Not Found</StatusMessage>';
        xmlFile += '</Status>';
        //logger.info(`populateResponseXml, status ${status} xmlFile ${xmlFile}`)
        response = xmlFile;
    } else if (status === '1002') {
        xmlFile += '<StatusMessage>' + ` SUBMSNUNIQID ${subUnid} is Invalid` + '</StatusMessage>';
        xmlFile += '</Status>';
        //logger.info(`populateResponseXml, status ${status} xmlFile ${xmlFile}`)
        response = xmlFile
    }

    logger.info(`populateResponseXml, response ${response}`)
    // let xmlFile = '<?xml version="1.0" encoding="UTF-8"?>';
    //     xmlFile += '<Status>';
    //     xmlFile += '<StatusCode>ERROR</StatusCode>';
    //     xmlFile += '<StatusSubject>ERROR</StatusSubject>';
    //     xmlFile += '<StatusMessage>' + ` SUBMSNUNIQID ${subUnid} is Invalid` + '</StatusMessage>';
    //     xmlFile += '</Status>';
    //return(xmlFile)
     res
        .contentType('application/xml')
        .send(response);
}

module.exports = {
    populateResponseXml,
};
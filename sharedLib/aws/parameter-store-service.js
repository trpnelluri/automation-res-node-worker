'use strict'

const awsParamEnv = require('aws-param-env');
const loggerUtils = require('../common/logger-utils');
const environment = process.env.environment || 'dev';
const parameterStore = process.env.PATH_PERAMETER_STORE;
const EventName = 'AWS_PARAMETER_STORE'
const configPath = parameterStore + environment + '/automationworker/config/'

/*
The following function is used to load all the enviornment variables from AWS parameterstore to Config file.
*/
function loadEnvVariablesFromAWSParamStore() {
    try {
        awsParamEnv.load(`${configPath}`, { region: 'us-east-1' });
        let logParams = {};
        const logger = loggerUtils.customLogger( EventName, logParams);
        logger.info('loadEnvVariablesFromAWSParamStore, Env variables loaded successfully from AWS Parameter Store.');
    } catch (err) {
        console.error('loadEnvVariablesFromAWSParamStore, ERROR loading the env variables: ' + err.stack)
    }
}

module.exports = {
    loadEnvVariablesFromAWSParamStore,
};
'use strict'

const express = require('express');
// eslint-disable-next-line no-unused-vars
const config = require('dotenv').config({ path: './config/.env' });
const ParameterStoreData = require('./sharedLib/aws/parameter-store-service');
// The follwoing method will load all the env veriables from AWS Parameter Store.
ParameterStoreData.loadEnvVariablesFromAWSParamStore();
const loggerUtils = require('./sharedLib/common/logger-utils');

const EventName = 'AUTOMATION_RES_APP';
let logParams = {};
const logger = loggerUtils.customLogger(EventName, logParams);
const app = express();
app.use('/', require('./routes/route'));
const port = process.env.port || 8093;
app.listen(port, () => {
    logger.info(`app.listen, listining on port: ${port}`);
});

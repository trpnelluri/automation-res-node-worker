'use strict'

const { deleteObjFromS3 } = require('../delete-object-from-s3')
const OLD_ENV = process.env;

jest.mock('../../sharedLib/common/logger-utils', () => ({
    customLogger: jest.fn((pgsLogFileName, EventName, logParams) => ({
        info: jest.fn(),
        error: jest.fn(),
        debug: jest.fn()
    }))
}));

describe('delete-object-from-s3-test', () => {

    beforeAll(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
        process.env.dleftfileextn = 'DLEFT.xml'
        process.env.dleftfilenamestart = 'XDRAdapterDSResponse'
    });
    
    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
        jest.clearAllMocks();
    });

    test('Call populateResponseXml with Valide response Error', async () => {
        const subUnid = 'SD091048T_1000711626185602256'
        const keyName = `SD091048T/XDRAdapterDSResponse_${subUnid}_DLEFT.xml`
        process.env.bucketname = 'dev-esmd-xdr-response-in'
        const mockCallback = jest.fn();
        await deleteObjFromS3(subUnid, keyName, mockCallback);
        expect(mockCallback).toBeCalledTimes(1);
    })

})

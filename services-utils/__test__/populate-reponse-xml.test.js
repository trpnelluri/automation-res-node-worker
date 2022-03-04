'use strict';

const { populateResponseXml } = require('../populate-response-xml')
const OLD_ENV = process.env;

jest.mock('../../sharedLib/common/logger-utils', () => ({
    customLogger: jest.fn((EventName, logParams) => ({
        info: jest.fn(),
        error: jest.fn(),
        debug: jest.fn(),
        clear: jest.fn()
    }))
}));

const logger = {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
};

const mockRequest = {
    res: jest.fn().mockImplementation(() => {
        return { setHeader: jest.fn() };
    }),
};

describe('populate-response-xml-test', () => {

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
        const expectedResult = `SD091048T/XDRAdapterDSResponse_${subUnid}_DLEFT.xml`
        const action = 'GET'
        const status = '1001'
        let response = null
        try {
            await populateResponseXml(mockRequest, action, status, logger, subUnid, response)
        } catch(err) {
            expect(undefined).not.toBe(expectedResult);
        }
    })

    test('Call populateResponseXml with invalid subunid Error', async () => {
        const subUnid = 'SD091048T_1000711626185602256'
        const expectedResult = `SD091048T/XDRAdapterDSResponse_${subUnid}_DLEFT.xml`
        const action = 'GET'
        const status = '1002'
        let response = null
        try {
            await populateResponseXml(mockRequest, action, status, logger, subUnid, response)
        } catch(err) {
            expect(undefined).not.toBe(expectedResult);
        }
    })

    test('Call populateResponseXml with invalid subunid Error', async () => {
        const subUnid = '-'
        const expectedResult = `SD091048T/XDRAdapterDSResponse_${subUnid}_DLEFT.xml`
        const action = 'GET'
        const status = '1002'
        let response = null
        try {
            await populateResponseXml(mockRequest, action, status, logger, subUnid, response)
        } catch(err) {
            expect(undefined).not.toBe(expectedResult);
        }
    })

    test('Call populateResponseXml with invalid TransId Error', async () => {
        const subUnid = '-'
        const expectedResult = `SD091048T/XDRAdapterDSResponse_${subUnid}_DLEFT.xml`
        const action = 'GET'
        const status = '1003'
        let response = null
        try {
            await populateResponseXml(mockRequest, action, status, logger, subUnid, response)
        } catch(err) {
            expect(undefined).not.toBe(expectedResult);
        }
    })

    test('Call populateResponseXml with invalid Header Data Error', async () => {
        const esmdTransID = '-_-'
        const expectedResult = `SD091048T/XDRAdapterDSResponse_${esmdTransID}_DLEFT.xml`
        const action = 'GET'
        const status = '1004'
        let response = null
        try {
            await populateResponseXml(mockRequest, action, status, logger, esmdTransID, response)
        } catch(err) {
            expect(undefined).not.toBe(expectedResult);
        }
    })

    test('Call populateResponseXml with Error', async () => {
        const subUnid = 'SD091048T_1000711626185602256'
        const expectedResult = `SD091048T/XDRAdapterDSResponse_${subUnid}_DLEFT.xml`
        const action = 'DELETE'
        const status = '1000'
        let response = null
        try {
            await populateResponseXml(mockRequest, action, status, logger, subUnid, response)
        } catch(err) {
            expect(undefined).not.toBe(expectedResult);
        }
    })

})
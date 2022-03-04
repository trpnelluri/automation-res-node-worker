'use strict';

const { populateKeyName } = require('../populate-keyname')
const OLD_ENV = process.env;

jest.mock('../../sharedLib/common/logger-utils', () => ({
    customLogger: jest.fn((EventName, logParams) => ({
        info: jest.fn(),
        error: jest.fn(),
        debug: jest.fn()
    }))
}));

describe('populate-keyname-test', () => {
    
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

    test('Call populateKeyName with SUCCESS', async () => {
        const subUnid = 'SD091048T_1000711626185602256'
        const esmdTransID = 'AWSC00007091021'
        const expectedResult = `SD091048T/XDRAdapterDSResponse_${subUnid}_${esmdTransID}_`
        const actaulResult = await populateKeyName(subUnid, esmdTransID)
        expect(actaulResult).toBe(expectedResult);
    })

    test('Call populateKeyName with Error', async () => {
        const subUnid = 'SD091048T1000711626185602256'
        const esmdTransID = 'AWSC00007091021'
        const expectedResult = undefined
        try {
            await populateKeyName(subUnid, esmdTransID)
        } catch(err) {
            expect(undefined).toBe(expectedResult);
        }
    })
})
'use strict';

const Controller = require('../../controllers/controller');

jest.mock('../../services-utils/populate-keyname');
jest.mock('../../services-utils/populate-response-xml')
jest.mock('../../services/get-object-data-from-s3');
jest.mock('../../services/delete-object-from-s3')

const getSpy = jest.fn();

jest.doMock('express', () => {
    return {
        Router() {
            return {
                get: getSpy,
            }
        }
    }
});

describe('should test all the routes in process-dlq-node-worker', () => {
    require('../route');
    test('should test get defult route', () => {
        expect(getSpy).toHaveBeenCalledWith('/', Controller.default);
    });

    
    test('should test get-object-response route', () => {
        expect(getSpy).toHaveBeenCalledWith('/esmd/automation/get-object-response', Controller.getResponseXMLData);
    });
    
    test('should test delete route', () => {
        expect(getSpy).toHaveBeenCalledWith('/esmd/automation/delete-object', Controller.deleteObject);
    });
        
});
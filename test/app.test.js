const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const handler = require('../src/handler');
const cloud = require('google-cloud');
const sinon = require('sinon');

describe('handler', function () {
    let startSpy = sinon.stub().resolves(true);
    let stopSpy = sinon.stub().resolves(true);
    sinon.stub(cloud, "compute").returns({zone: () =>
        ({vm: () => ({
            start: startSpy,
            stop: stopSpy
        })})
    });

    it('should throw error if no cron job', function () {
        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest({
            method: 'GET',
            url: '/start'
        });

        handler(req, res, 'start');

        expect(res.statusCode).to.equal(400);
        expect(res._isJSON()).to.equal(true);
        expect(JSON.parse(res._getData())).to.deep.equal({
            type: 'Unauthorized',
            message: 'Only cron jobs have access'
        })
    });


    it('should throw error if no instances defined', function () {
        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest({
            method: 'GET',
            headers: {
                ['X-Appengine-Cron']: true
            },
            url: '/start'
        });

        handler(req, res, 'start');

        expect(res.statusCode).to.equal(400);
        expect(res._isJSON()).to.equal(true);
        expect(JSON.parse(res._getData())).to.deep.equal({
            type: 'InstanceNotDefined',
            message: 'Please define at least one instance'
        })
    });

    it('should call start for instances', function () {
        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest({
            method: 'GET',
            url: '/start/zone1:instance1',
            headers: {
                ['X-Appengine-Cron']: true
            },
            params: {
                instances: 'zone1:instance1'
            }
        });

        handler(req, res, 'start');

        expect(res.statusCode).to.equal(200);
    });
});
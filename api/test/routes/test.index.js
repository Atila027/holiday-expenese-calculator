'use strict';

const request = require('supertest');
const app = require('../../app');

describe('GET /', () => {
    it('responds with json', done => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({ message: 'Holiday expenses server is running' });
    });
});
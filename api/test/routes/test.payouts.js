'use strict';

const request = require('supertest');
const app = require('../../app');

describe('POST /payouts', () => {
    it('responds with status code 400 when no body is sent', (done) => {
        request(app)
            .post('/payouts')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('responds with status code 200 when proper body is sent', (done) => {
        const data = {
            "expenses": [
                { "name": "Adriana", "amount": 5.75 },
                { "name": "Adriana", "amount": 5.75 },
                { "name": "Bao", "amount": 12 }
            ]
        };
        request(app)
            .post('/payouts')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
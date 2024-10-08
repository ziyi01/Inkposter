require("dotenv").config();
var debug = require('debug')('test:route');
const request = require('supertest');
const app = require('../app');

describe('REST API endpoint tests', () => {
    test('/api/user/0 should return test user', async () => {
        const response = await request(app).get('/api/user/0');
        debug(response);

        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    })

    test('/api/user/0/user_stats should return test user stats', async () => {
        const response = await request(app).get('/api/user/0/user_stats');
        debug(response);

        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    })

    test('/api/user/10000 non-existent user should return 404', async () => {
        const response = await request(app).get('/api/user/10000');
        debug(response);

        expect(response.statusCode).toBe(404);
    })
});

// TODO: Add tests for OpenAI API
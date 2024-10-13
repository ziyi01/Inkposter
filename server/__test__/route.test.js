require("dotenv").config();
var debug = require('debug')('test:route');
const request = require('supertest');
const app = require('../app');
var db = require("../db.js");

describe('MongoDB endpoint tests', () => {
    test('/api/user/0 should return test user', async () => {
        const response = await request(app).get('/api/user/0');
        debug(response);

        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    })

    test('/api/user/0/userStats should return test user stats', async () => {
        const response = await request(app).get('/api/user/0/userStats');
        debug(response);

        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    })

    test('/api/user/10000 non-existent user should return 404', async () => {
        const response = await request(app).get('/api/user/10000');
        debug(response);

        expect(response.statusCode).toBe(404);
    })

    afterAll((done) => {
        // Close connection
        db.disconnectFromMongoDB();
        done();
    });
});

// ------------------------------
// OpenAI tests
// ------------------------------
describe('OpenAI endpoint tests', () => {
    test('/api/openai/username should return 200', async () => {
        const response = await request(app).get('/api/openai/username');
        debug(response);

        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html');
    });
    test('/api/openai/sessionPrompts should return 200', async () => {
        const response = await request(app).get('/api/openai/sessionPrompts');
        debug(response);

        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html');
    });
});
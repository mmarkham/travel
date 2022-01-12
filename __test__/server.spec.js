import app from '../src/server/server';
const request = require('supertest');

describe("GET Method", () => {
    it('should return a 200', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
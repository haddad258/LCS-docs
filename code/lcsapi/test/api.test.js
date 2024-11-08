const { setup } = require('../src/app'); // Adjust the path to your app setup
const config = {
    log: 'dev', // or whatever log format you are using
    secret: '"test-for-app-secret"' // your session secret
};
const { dbmobile } = require('../src/models/models.mobile');
// Initialize the app
const app = setup(config);

// Set the base URL for the API
const axios = require('axios');
const baseURL = "http://192.168.1.28:3009/mobile";

// Set the base URL for the API

describe('GET /categories', () => {
    it('should return a list of categories', async () => {
        const mockCategories = [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
        ];

        // Mock the database call (assuming you're using jest.mock for db calls)
        dbmobile.Categories.findAll.mockResolvedValue(mockCategories);

        const response = await axios.get(`${baseURL}/api/public/plan/packs`, {
            headers: {
                Accept: 'application/json',
            },
        });

        expect(response.status).toBe(200);
        expect(response.data).toEqual(mockCategories);
    });

    it('should return a 500 error on failure', async () => {
        dbmobile.Categories.findAll.mockRejectedValue(new Error('Database error'));

        try {
            await axios.get(`${baseURL}/categories`, {
                headers: {
                    Accept: 'application/json',
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.data).toHaveProperty('error', 'Internal error');
        }
    });
});

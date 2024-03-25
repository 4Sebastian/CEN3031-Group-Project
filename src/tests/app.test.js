const request = require('supertest');
const express = require('express');
const app = require('../app'); // Adjust the path to where your Express app is exported
const db = require('../services/database'); // Adjust the path to your database service

jest.mock('../services/database'); // Mock the database service
jest.mock('../services/authentication', () => ({
  verifyToken: jest.fn((req, res, next) => next()), // Mock verifyToken middleware to always call next()
  getTokenId: jest.fn(() => Promise.resolve('testUserId')),
}));

// Mock for db.collection().count().get()
db.collection.mockImplementation(() => ({
  count: () => ({
    get: jest.fn(() => Promise.resolve({ data: () => ({ count: 5 }) })),
  }),
}));

describe('GET /', () => {
  test('It should respond with the number of users', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ label: 'There are 5 users in HockeyNGo', num: 5 });
  });
});

describe('POST /create', () => {
  // Further mock the db.collection().add() function for this test case
  beforeEach(() => {
    db.collection.mockImplementationOnce(() => ({
      add: jest.fn(() => Promise.resolve({ id: 'newEventId' })),
    }));
  });

  test('It should create a new event and return success', async () => {
    const response = await request(app)
      .post('/create')
      .send({ /* your event data here */ });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, id: 'newEventId' });
  });
});

// Add more tests here following the pattern above


import request from 'supertest';
import app from '../app';

describe('Server', () => {
  test('Root endpoint should return API information', async () => {
    const response = await request(app).get('/');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('endpoints');
    expect(response.body.endpoints).toHaveProperty('characters');
  });
  
  // test('Characters endpoint should return 501 Not Implemented initially', async () => {
  //   const response = await request(app).get('/characters?name=rick');
    
  //   expect(response.statusCode).toBe(501);
  //   expect(response.body).toHaveProperty('message', 'Not implemented yet');
  // });
});

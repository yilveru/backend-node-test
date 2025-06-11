import { Request, Response } from 'express';
import { getCharacters } from '../controllers/characterController';
import { fetchCharacterByName, fetchCharacterFromDb } from '../services/rickAndMortyApi';
import { Character } from '../db/models';
import { characterCache } from '../services/cache';

// Mock the dependencies
jest.mock('../services/rickAndMortyApi');
jest.mock('../db/models', () => ({
  Character: {
    findAll: jest.fn(),
    findOrCreate: jest.fn()
  },
  Op: {
    like: 'like'
  }
}));

describe('Character Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    characterCache.clear();
    
    // Mock request and response
    req = {
      query: { name: 'Rick' }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Mock console.log to avoid cluttering test output
    console.log = jest.fn();
    console.error = jest.fn();
  });
  
  // test('should return 501 Not Implemented initially', async () => {
  //   await getCharacters(req as any, res as Response);
    
  //   expect(res.status).toHaveBeenCalledWith(501);
  //   expect(res.json).toHaveBeenCalledWith({ message: 'Not implemented yet' });
  // });
  
  // TODO: Uncomment and complete these tests as you implement the controller

  
  test('should return 400 if name is not provided', async () => {
    req.query = {};
    await getCharacters(req as any, res as Response);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Name parameter is required' });
  });
  
  test('should return characters from database if available', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez', species: 'Human', gender: 'Male' }
    ];
    
    (fetchCharacterFromDb as jest.Mock).mockResolvedValue(mockCharacters);
    (fetchCharacterByName as jest.Mock).mockResolvedValue([]);
    
    await getCharacters(req as any, res as Response);
    
    expect(fetchCharacterFromDb).toHaveBeenCalledWith({
      name: 'Rick Sanchez',
      species: 'Human',
      gender: 'Male'
    });
    expect(fetchCharacterByName).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCharacters);
  });
  
  test('should fetch from API and save to database if not in database', async () => {
    const mockApiResults = [
      { id: 1, name: 'Rick Sanchez', species: 'Human', gender: 'Male' }
    ];
    
    (Character.findAll as jest.Mock).mockResolvedValue([]);
    (fetchCharacterByName as jest.Mock).mockResolvedValue(mockApiResults);
    (Character.findOrCreate as jest.Mock).mockResolvedValue([mockApiResults[0], true]);
    
    await getCharacters(req as any, res as Response);
    
    expect(Character.findAll).toHaveBeenCalled();
    expect(fetchCharacterByName).toHaveBeenCalledWith('Rick');
    expect(Character.findOrCreate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockApiResults);
  });
  
  test('should filter by species if provided', async () => {
    req.query = { name: 'Rick', species: 'Human' };
    
    await getCharacters(req as any, res as Response);
    
    expect(Character.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        species: 'Human'
      })
    }));
  });
  
  test('should filter by gender if provided', async () => {
    req.query = { name: 'Rick', gender: 'Male' };
    
    await getCharacters(req as any, res as Response);
    
    expect(Character.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        gender: 'Male'
      })
    }));
  });
  
  test('should handle API errors gracefully', async () => {
    (Character.findAll as jest.Mock).mockResolvedValue([]);
    (fetchCharacterByName as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    await getCharacters(req as any, res as Response);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('Error')
    }));
  });
  
  test('should use cache for repeated requests', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez', species: 'Human', gender: 'Male' }
    ];
    
    (Character.findAll as jest.Mock).mockResolvedValue([]);
    (fetchCharacterByName as jest.Mock).mockResolvedValue(mockCharacters);
    
    // First request
    await getCharacters(req as any, res as Response);
    
    // Second request with same parameters
    await getCharacters(req as any, res as Response);
    
    // fetchCharacterByName should only be called once
    expect(fetchCharacterByName).toHaveBeenCalledTimes(1);
  });
  
});

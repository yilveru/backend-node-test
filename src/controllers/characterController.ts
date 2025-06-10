import { Request, Response } from 'express';
import { fetchCharacterByName } from '../services/rickAndMortyApi';
import { Character } from '../db/models';
import { Op } from 'sequelize';
import { CharacterRequest } from '../types/request';
import { CharacterFilter } from '../types/character';

/**
 * Get characters by name with optional filters
 * 
 * TODO: Implement this function to:
 * 1. Get characters by name from the database
 * 2. If not found in the database, fetch from the Rick & Morty API
 * 3. Save API results to the database
 * 4. Implement a cache system
 * 5. Support filtering by species and gender
 */
const getCharacters = async (req: CharacterRequest, res: Response): Promise<void> => {
  // TODO: Implement this controller
  res.status(501).json({ message: 'Not implemented yet' });
};

export {
  getCharacters
};

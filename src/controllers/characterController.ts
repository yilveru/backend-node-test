import { Response } from 'express';
import { fetchCharacter, fetchCharacterFromDb, saveCharacterOnDb } from '../services/rickAndMortyApi';
import { CharacterRequest } from '../types/request';
import { CharacterFilter } from '../types/character';
import { characterCache } from '../services/cache';

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

  // Extract query parameters
  const { name, species, gender } = req.query;

  if (!name) {
    res.status(400).json({ message: 'Name parameter is required' });
    return;
  }

  const filter: CharacterFilter = {
    name: name as string,
    species: species as string,
    gender: gender as string
  };

  // Check if characters are cached
  const cachedCharacters = characterCache.get(filter);
  if (cachedCharacters) {
    console.log('cache hit');
    res.status(200).json(cachedCharacters);
    return;
  }

  // Fetch characters from the database
  const dbCharacters = await fetchCharacterFromDb(filter);
  if (dbCharacters.length > 0) {
    characterCache.set(filter, dbCharacters);
    res.status(200).json(dbCharacters);
    return;
  }

  // If not found in the database, fetch from the Rick & Morty API
  let apiCharacters;
  try {
    apiCharacters = await fetchCharacter(filter);
    if (apiCharacters.length === 0) {
      res.status(404).json({ message: 'No characters found' });
      return;
    }
  } catch (error) {
    console.error('Error fetching characters from API:', error);
    res.status(500).json({ message: 'Error fetching characters from API' });
    return;
  }

  // If there are no characters from the API, return 404
  if (apiCharacters.length === 0) {
    res.status(404).json({ message: 'No characters found' });
    return;
  }

  // Save API results to the database, we olso cache the results in this part, to avoid get data from database again
  await saveCharacterOnDb(apiCharacters);

  res.status(200).json(apiCharacters);
};


export {
  getCharacters
};

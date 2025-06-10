import axios from 'axios';
import { RickAndMortyCharacter } from '../types/character';

/**
 * Fetches characters from Rick and Morty API by name
 * @param {string} name - The name to search for
 * @returns {Promise<RickAndMortyCharacter[]>} - Array of characters that match the name
 */
async function fetchCharacterByName(name: string): Promise<RickAndMortyCharacter[]> {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`);
    return response.data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

export { fetchCharacterByName };

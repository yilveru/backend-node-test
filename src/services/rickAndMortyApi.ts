import axios from 'axios';
import { Op } from 'sequelize';
import { RickAndMortyCharacter } from '../types/character';
import { Character } from '../db/models';
import { CharacterFilter } from '../types/character';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Fetches characters from Rick and Morty API by name
 * @param {string} name - The name to search for
 * @returns {Promise<RickAndMortyCharacter[]>} - Array of characters that match the name
 */
async function fetchCharacter(filter: CharacterFilter): Promise<RickAndMortyCharacter[]> {
  try {
    const name = filter.name || '';
    if (!name) {
      throw new Error('Name parameter is required');
    }

    const response = await axios.get(`${process.env.API_URL}/character/`, {
      params: {
        name: filter.name,
        ...(filter.species && { species: filter.species }),
        ...(filter.gender && { gender: filter.gender }),
      }
    });
    return response.data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}


/**
 * Get characters by name with optional filters from the database or API
 * @param character - The character filter object containing name, species
 * @returns {Promise<RickAndMortyCharacter[]>} - Array of characters that match the filter
 */
async function fetchCharacterFromDb(character: CharacterFilter): Promise<RickAndMortyCharacter[]> {

  // Fetch characters from the database
  const dbFilter: any = {
    name: {
      [Op.like]: `%${character.name}%`
    }
  };
  if (character.species) {
    dbFilter.species = {
      [Op.like]: `%${character.species}%`
    };
  }
  if (character.gender) {
    dbFilter.gender = {
      [Op.like]: `%${character.gender}%`
    };
  }

  const characters = await Character.findAll({
    where: dbFilter
  });
  if (characters.length > 0) {
    return characters.map((character: any) => character.toJSON() as RickAndMortyCharacter);
  }

  // If no characters are found, return an empty array
  return [];
};

/**
 * Save characters to the database
 * @param characters - Array of characters to save
 * @returns {Promise<void>}
 */
async function saveCharacterOnDb(characters: RickAndMortyCharacter[]): Promise<void> {
  if (characters.length === 0) return;

  try {
    const existingCharacters = await Character.findAll({
      where: {
        id: characters.map((c) => c.id),
      },
    });

    const existingIds = new Set(existingCharacters.map((c) => c.getDataValue('id')));
    const charactersToInsert = characters.filter((char) => !existingIds.has(char.id));

    if (charactersToInsert.length === 0) return;

    const formattedCharacters = charactersToInsert.map((char) => ({
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      type: char.type,
      gender: char.gender,
      origin: char.origin.name,
      location: char.location.name,
      image: char.image,
      created: new Date(char.created),
    }));

    await Character.bulkCreate(formattedCharacters, {
      ignoreDuplicates: true,
    });
  }
  catch (error) {
    console.error('Error saving characters to the database:', error);
    throw error;
  };
}
export { fetchCharacter, fetchCharacterFromDb, saveCharacterOnDb };

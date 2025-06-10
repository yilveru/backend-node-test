/**
 * Interface for Character model
 */
export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
  created: Date;
}

/**
 * Interface for Rick and Morty API response
 */
export interface RickAndMortyApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: RickAndMortyCharacter[];
}

/**
 * Interface for Rick and Morty API character
 */
export interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/**
 * Interface for character filter options
 */
export interface CharacterFilter {
  name: string;
  species?: string;
  gender?: string;
}

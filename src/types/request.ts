import { Request } from 'express';

/**
 * Extended Express Request with query parameters for character filtering
 */
export interface CharacterRequest extends Request {
  query: {
    name?: string;
    species?: string;
    gender?: string;
  };
}

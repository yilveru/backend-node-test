import express, { Router } from 'express';
import { getCharacters } from '../controllers/characterController';

const router: Router = express.Router();

/**
 * @route   GET /characters
 * @desc    Get characters by name with optional filters
 * @query   {string} name - Character name to search for (required)
 * @query   {string} species - Filter by species (optional)
 * @query   {string} gender - Filter by gender (optional)
 */
router.get('/', getCharacters);

export default router;

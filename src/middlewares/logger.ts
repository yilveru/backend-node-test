import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for logging request information
 * 
 * TODO: Implement this middleware to:
 * 1. Log request method and URL
 * 2. Log query parameters if they exist
 * 3. Track request duration
 * 4. Log response status code and duration when the request completes
 */
const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: Implement the logging middleware
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
};

export { requestLogger };

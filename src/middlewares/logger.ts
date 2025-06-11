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
  const start = Date.now();

  console.log(`➡️  ${req.method} ${req.originalUrl}`);

  if (Object.keys(req.query).length > 0) {
    console.log(`🔍 Query: ${JSON.stringify(req.query)}`);
  }

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`✅ ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
};

export { requestLogger };

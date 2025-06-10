import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { requestLogger } from './middlewares/logger';
import characterRoutes from './routes/characterRoutes';
import { initDatabase } from './db/models';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Express application
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/characters', characterRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Rick and Morty API Service',
    endpoints: {
      characters: '/characters?name=rick&species=human&gender=male'
    }
  });
});

// Initialize database before starting the server
console.log('Initializing database...');
initDatabase()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });

export default app;

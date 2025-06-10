import { Sequelize, DataTypes, Model } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';
import { ICharacter } from '../types/character';

dotenv.config();

// Get database path from environment variables
const dbPath = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

// Define Character model with TypeScript interface
const Character = sequelize.define<Model<ICharacter>>('Character', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING
  },
  species: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING
  },
  origin: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  created: {
    type: DataTypes.DATE
  }
});

// Initialize the database
const initDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models with the database
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {
  sequelize,
  Character,
  initDatabase
};

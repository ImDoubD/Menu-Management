import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Adjust for serverless or secure environments
    },
  },
});

const testSequelizeConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Sequelize connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the Sequelize database:", error);
      process.exit(1);
    }
  };


export { sequelize,testSequelizeConnection };
import app from './app';
import { sequelize } from './database';

const PORT = process.env.PORT || 3000;


(async () => {
  try {
    await sequelize.sync();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
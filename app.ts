import express, { Request, Response } from 'express';
import categoryRoutes from './routes/categoryRoutes';
import itemRoutes from './routes/itemRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/item', itemRoutes);
app.use('/subCategory', subCategoryRoutes);

app.get("/api", (req: Request, res: Response) => {
    res.send("Server is running....");
  });

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running....");
  });

export default app;
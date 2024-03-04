import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes';
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.APP_NAME} is running on port ${process.env.PORT}`);
});

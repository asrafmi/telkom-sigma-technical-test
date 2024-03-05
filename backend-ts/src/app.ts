import express, { Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import apiRouter from './routes';
import * as swaggerDocument from './docs/swagger.json';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.APP_NAME} is running on port ${process.env.PORT}`);
});

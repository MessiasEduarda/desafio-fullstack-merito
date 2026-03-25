import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { fundRoutes } from './routes/fund.routes';
import { transactionRoutes } from './routes/transaction.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

app.use('/api/funds', fundRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3333;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
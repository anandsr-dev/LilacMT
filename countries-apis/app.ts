import express from 'express';
import countriesRouter from './router/countries';
import cors from 'cors';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/countries', countriesRouter);

export default app;
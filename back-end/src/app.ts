import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import api from './router';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

export default app;
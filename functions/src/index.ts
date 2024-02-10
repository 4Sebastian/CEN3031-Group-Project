import express, { Express, Request, Response } from "express";
import { onRequest } from 'firebase-functions/v2/https';
import users from './user';
require("firebase-functions/logger/compat");

const app: Express = express();

app.get('/', (_req: Request, res: Response) => {
  return res.send('Hello World!');
});

app.use('/users', users)

// Expose Express API as a single Cloud Function:
exports.express = onRequest(app);

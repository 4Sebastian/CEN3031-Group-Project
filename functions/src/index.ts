import express, { Express, Request, Response } from "express";
import { onRequest } from 'firebase-functions/v2/https';
import users from './user';
import events from './event';
import friends from './friends';
require("firebase-functions/logger/compat");

const app: Express = express();

var cors = require('cors')
app.use(cors())

app.get('/', (_req: Request, res: Response) => {
  return res.send('Hello World!');
});

app.use('/users', users)
app.use('/events', events)
app.use('/friends', friends)
// Expose Express API as a single Cloud Function:
exports.express = onRequest({ cors: true }, app);
export default app;

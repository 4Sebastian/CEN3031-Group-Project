import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();

const db = getFirestore();



import express, { Express, Request, Response } from "express";
const app: Express = express();
// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
// app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.send(Widgets.list()));

app.get('/', (_req: Request, res: Response) => {
  return res.send('Hello World!');
});
app.get('/addData', async (_req: Request, res: Response) => {

  const docRef = db.collection('users').doc('alovelace');

  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });
  return res.send("Ada Lovelace born 1815 was added to the database!");
});
// Expose Express API as a single Cloud Function:
exports.widgets = onRequest(app);

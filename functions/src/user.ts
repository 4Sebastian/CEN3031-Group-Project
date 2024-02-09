import express, { Express, Request, Response } from "express";
import db from './services/database';
import jwt from 'jsonwebtoken';
import { encrypt, decrypt, verifyToken, getTokenId } from './services/authentication';
const app: Express = express();

// Root endpoint gives count of users
app.get('/', async (_req: Request, res: Response) => {
  const users = db.collection("users")
  const snapshot = await users.count().get();

  return res.json(
    {
      "label": `There are ${snapshot.data().count} users in HockeyNGo`,
      "num": snapshot.data().count
    }
  )
});

app.get('/login', async (req: Request, res: Response) => {
  if (req.body && req.body.username && req.body.password) {
    const users = db.collection("users");
    const snapshot = await users.where("username", "==", req.body.username).get();

    if (snapshot.empty) {
      return res.status(300).json({ error: "Username not found" });
    }

    var token = null;
    snapshot.forEach((doc) => {
      if (decrypt(doc.data().password) === req.body.password) {
        token = jwt.sign({ id: encrypt(doc.id) }, process.env.SECRET || 'secret', { expiresIn: '1h' });
      }
    });

    if (token != null) {
      return res.status(200).json({ success: true, token: token });
    }

    return res.status(303).json({ error: "Invalid credentials" });
  }
  return res.status(304).json({ error: "Missing credentials" });
});

app.delete('/delete', verifyToken, async (req: Request, res: Response) => {
  const users = db.collection("users");
  const snapshot = await users.where("id", "==", getTokenId(req)).get();

  snapshot.forEach((doc) => {
    db.collection("users").doc(doc.id).delete();
  });
  return res.status(200).json({ success: true, message: "User deleted" });
});

// app.get('/getInfo', verifyToken, async (req: Request, res: Response) => {
//   const users = db.collection("users");
//   const snapshot = await users.where("id", "==", getTokenId(req)).get();
//
//   Promise < any > info = null;
//   snapshot.forEach((doc) => {
//     info = db.collection("users").doc(doc.id).get();
//   });
//   return res.status(200).json(await info);
// });



// Expose Express API as a single Cloud Function:
export default app;

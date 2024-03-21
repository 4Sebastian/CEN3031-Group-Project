import express, { Express, Request, Response } from "express";
import { verifyToken, getTokenId } from "./services/authentication";
//import { getTokenId, verifyToken } from "./services/authentication";
import db from './services/database';

const app: Express = express();

app.get('/', async (_req: Request, res: Response) => {
  const events = db.collection("friends")
  const snapshot = await events.count().get();
  return res.json(
    {
      "label": `There are ${snapshot.data().count} events in HockeyNGo`,
      "num": snapshot.data().count
    }
  )
})

app.get('/list', verifyToken, async (req: Request, res: Response) => {
  var users = db.collection("users");
  var friends = db.collection("friends");
  var id = await getTokenId(req);
  var user = await users.doc(id).get();
  if (!user.exists) {
    var friendsList = await friends.where("firstuser", "==", id).get();
    var usersList = await users.where("id", "in", friendsList.docs.map(d => d.data().seconduser)).get();
    return res.status(200).json(usersList.docs);
  }
  return res.status(300).json({ message: "Not authorized" });
});

app.post('/add', verifyToken, async (req: Request, res: Response) => {
  var users = db.collection("users");
  var friends = db.collection("friends");
  var id = await getTokenId(req);
  var user = await users.doc(id).get();
  if (!user.exists) {
    var friendcode = req.body.friendcode;
    var otherUser = await users.where("friendcode", "==", friendcode).limit(1).get();
    if (!otherUser.empty) {
      friends.add({ firstuser: id, seconduser: otherUser.docs[0].id });
      friends.add({ firstuser: otherUser.docs[0].id, seconduser: id });
      return res.status(200).json({ success: true });
    }
    return res.status(303).json({ error: "User not found" });
  }
  return res.status(300).json({ message: "Not authorized" });
});

app.delete('/remove', verifyToken, async (req: Request, res: Response) => {
  var users = db.collection("users");
  var friends = db.collection("friends");
  var id = await getTokenId(req);
  var user = await users.doc(id).get();
  if (!user.exists) {
    var friendcode = req.body.friendcode;
    var otherUser = await users.where("friendcode", "==", friendcode).limit(1).get();
    if (!otherUser.empty) {
      friends.where("firstuser", "==", id).where("seconduser", "==", otherUser.docs[0].id).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        })
      })
      friends.where("seconduser", "==", id).where("firstuser", "==", otherUser.docs[0].id).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        })
      })
    }
    return res.status(303).json({ error: "User not found" });
  }
  return res.status(300).json({ message: "Not authorized" });
});


export default app;

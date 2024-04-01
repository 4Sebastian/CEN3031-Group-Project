import express, { Express, Request, Response } from "express";
import { verifyToken, getTokenId } from "./services/authentication";
import db from './services/database';
import { UserFields, getUser } from "./components/user";

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
  if (user.exists) {
    var friendsList = await friends.where("firstuser", "==", id).get();
    console.log("found friends: " + friendsList.size);
    if (!friendsList.empty) {
      var usersList = await users.where("__name__", "in", friendsList.docs.map(d => d.get("seconduser"))).get();
      console.log(friendsList.docs.map(d => d.get("seconduser")));

      return res.status(200).json(usersList.docs.map(d => {
        var dbuser = d.data();
        delete dbuser.password;
        return dbuser;
      }));
    }
    return res.status(200).json([]);
  }
  return res.status(404).json({ message: "Not authorized" });
});

app.post('/add', verifyToken, async (req: Request, res: Response) => {
  var users = db.collection("users");
  var friends = db.collection("friends");
  var id = await getTokenId(req);
  var user = await users.doc(id).get();
  if (user.exists) {
    var friendcode: string = req.body.friendcode;
    var otherUser = await users.where("friendcode", "==", friendcode?.trim()).limit(1).get();
    if (!otherUser.empty) {
      if(otherUser.docs[0].id == id){
        return res.status(303).json({ error: "Cannot friend yourself" });
      }
      var potentialFriend = await friends.where("firstuser", "==", otherUser.docs[0].id).where("seconduser", "==", id).limit(1).get();
      if (potentialFriend.empty) {
        friends.add({ firstuser: id, seconduser: otherUser.docs[0].id });
        friends.add({ firstuser: otherUser.docs[0].id, seconduser: id });
        return res.status(200).json({ success: true });
      }
      return res.status(303).json({ error: "Already friends" });
    }
    return res.status(303).json({ error: "User not found" });
  }
  return res.status(404).json({ message: "Not authorized" });
});

app.delete('/remove', verifyToken, async (req: Request, res: Response) => {
  var users = db.collection("users");
  var friends = db.collection("friends");
  var id = await getTokenId(req);
  var user = await users.doc(id).get();
  if (user.exists) {
    var friendcode: string = req.body.friendcode;
    console.log(friendcode);
    var otherUser = await users.where("friendcode", "==", friendcode?.trim()).limit(1).get();
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
      return res.status(200).json({ success: true });
    }
    return res.status(303).json({ error: "User not found" });
  }
  return res.status(404).json({ message: "Not authorized" });
});

app.get('/getInfo/:username', verifyToken, async (req: Request, res: Response) => {
  const users = db.collection("users");
    
    var friend = await users.where("username", "==", req.params.username).limit(1).get(); 
    
    if(friend.size > 0){
      var data = friend.docs[0].data();
      var info: typeof UserFields = getUser(data);
      delete info.password;
      return res.status(200).json(info);
    }
    return res.status(300).json({ error: "Invalid User Name:"});
});

export default app;

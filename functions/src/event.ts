import express, { Express, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid'
import { AttendsFields } from "./components/attends";
import { EventFields, getEvent, validateEventBody } from "./components/event";
import { getTokenId, verifyToken } from "./services/authentication";
import db from './services/database';

const app: Express = express();

app.get('/', async (_req: Request, res: Response) => {
  const events = db.collection("events")
  const snapshot = await events.count().get();
  return res.json(
    {
      "label": `There are ${snapshot.data().count} events in HockeyNGo`,
      "num": snapshot.data().count
    }
  )
});

app.get('/getInfo/:id', verifyToken, async (req: Request, res: Response) => {
  const events = db.collection("events");
  const friends = db.collection("friends");
  const users = db.collection("users");
  const allFriends = friends.where("firstuser", '==', await getTokenId(req)).get();
  var allFriendsMapped = (await allFriends).docs.map(doc => doc.data().seconduser);
  allFriendsMapped.push(await getTokenId(req));

  const allUsers = await users.where("__name__", 'in', allFriendsMapped).get();
  const creaters = allUsers.docs.map(doc => doc.data().friendcode);

  const event = await events.where("id", '==', req.params.id).limit(1).get();
  if (!event.empty) {
    var data = event.docs[0].data();
    if (data.visibility == "friends" && !creaters.includes(data.creator)) {
      return res.status(300).json({ error: "Event not found" })
    }
    return res.status(200).json(event.docs[0].data());
  }
  return res.status(300).json({ error: "Event not found" })
});

app.get('/getAttendees/:id', verifyToken, async (req: Request, res: Response) => {
  const events = db.collection("events");
  const friends = db.collection("friends");
  const users = db.collection("users");
  const allFriends = friends.where("firstuser", '==', await getTokenId(req)).get();
  var allFriendsMapped = (await allFriends).docs.map(doc => doc.data().seconduser);
  allFriendsMapped.push(await getTokenId(req));

  const allUsers = await users.where("__name__", 'in', allFriendsMapped).get();
  const creaters = allUsers.docs.map(doc => doc.data().friendcode);

  const event = await events.where("id", '==', req.params.id).limit(1).get();
  if (!event.empty) {
    var data = event.docs[0].data();
    if (data.visibility == "friends" && !creaters.includes(data.creator)) {
      return res.status(300).json({ error: "Event not found" })
    }
    const attends = db.collection("attends");
    const attending = (await attends.where("event", '==', event.docs[0].data().id).get()).docs.map(doc => doc.data().user);
    if (attending.length == 0) {
      return res.status(200).json([])
    }
    const attendingUsers = await users.where("__name__", 'in', attending).get();
    const usersData = attendingUsers.docs.map(doc => {
      var data = doc.data();
      delete data.password;
      return data;
    });
    return res.status(200).json(usersData);
  }
  return res.status(300).json({ error: "Event not found" })
});

app.get('/getFriendEvents/:friendcode', verifyToken, async (req: Request, res: Response) => {
  const events = db.collection("events");
  const attends = db.collection("attends")
  var users = db.collection("users");
  const friend = await users.where("friendcode", '==', req.params.friendcode).limit(1).get();
  if (!friend.empty) {
    var allEvents: string[] = [];
    (await attends.where("user", '==', friend.docs[0].id).get()).forEach((snapshot) => { allEvents.push(snapshot.data().event) });
    var eventsInfo = await events.where("__name__", 'in', allEvents).get();
    return res.status(200).json(eventsInfo.docs);
  }
  return res.status(300).json({ error: "Friend not found" });
});

app.get('/getAllPersonal', verifyToken, async (_req: Request, res: Response) => {
  const events = db.collection("events");
  var friendcode = (await db.collection("users").doc(await getTokenId(_req)).get()).data()?.friendcode;
  if (friendcode) {
    return res.status(200).json((await events.where("creator", '==', friendcode).get()).docs.map(doc => doc.data()));
  }
  return res.status(300).json({ error: "User not found" });
});

app.get('/getAll', verifyToken, async (_req: Request, res: Response) => {
  const events = db.collection("events");
  return res.status(200).json((await events.where("visibility", '==', "public").get()).docs.map(doc => doc.data()));
});

app.get('/getAllPrivate', verifyToken, async (_req: Request, res: Response) => {
  const events = db.collection("events");
  const friends = db.collection("friends");
  const users = db.collection("users");
  const allFriends = friends.where("firstuser", '==', await getTokenId(_req)).get();
  var allFriendsMapped = (await allFriends).docs.map(doc => doc.data().seconduser);
  allFriendsMapped.push(await getTokenId(_req));
  if (allFriendsMapped.length == 0) {
    return res.status(200).json([])
  }
  const allUsers = await users.where("__name__", 'in', allFriendsMapped).get();
  const creaters = allUsers.docs.map(doc => doc.data().friendcode);
  if (creaters.length == 0) {
    return res.status(200).json([])
  }
  return res.status(200).json((await events.where("visibility", '==', "friends").where("creator", 'in', creaters).get()).docs.map(doc => doc.data()));
});

app.post('/create', verifyToken, async (req: Request, res: Response) => {
  const events = db.collection("events");
  if (validateEventBody(req)) {
    var event: typeof EventFields = getEvent(req.body);
    event.visibility = event.visibility?.trim().toLowerCase() === "public" ? "public" : "friends";
    var users = db.collection("users");
    var user = (await users.doc(await getTokenId(req)).get());
    if (user.data() == undefined && user.data()?.friendcode == undefined) {
      return res.status(303).json({ error: "Invalid User" });
    }
    event.creator = user.data()?.friendcode;
    event.id = uuidv4();
    const attends = db.collection("attends")
    var attend: typeof AttendsFields = { user: user.id, event: event.id }
    attends.add(attend)
    events.add(event)
    return res.status(200).json({ success: true, id: event.id });
  }
  return res.status(303).json({ error: "Invalid Event" });
});

app.delete('/delete/:id', verifyToken, async (req: Request, res: Response) => {
  const events = db.collection("events");
  const event = await events.where("id", '==', req.params.id).limit(1).get();
  var users = db.collection("users");
  var user = (await users.doc(await getTokenId(req)).get());
  if (!event.empty) {
    if (event.docs[0].data().creator != user.data()?.friendcode) {
      return res.status(303).json({ error: "Wrong User" });
    }
    const attends = db.collection("attends")
    attends.where("event", '==', event.docs[0].data().id).get().then((data) => { data.forEach(doc => { doc.ref.delete() }) });
    events.doc(event.docs[0].id).delete();
    return res.status(200).json({ success: true });
  }
  return res.status(300).json({ error: "Event not found" })
});

app.put('/update/:id', verifyToken, async (req: Request, res: Response) => {
  const events = db.collection("events");
  const event = await events.where("id", '==', req.params.id).limit(1).get();
  if (!event.empty) {
    if (req.body.visibility) {
      req.body.visibility = req.body.visibility.trim().toLowerCase() === "public" ? "public" : "friends";
    }
    events.doc(event.docs[0].id).update(req.body);
    return res.status(200).json({ success: true });
  }
  return res.status(300).json({ error: "Event not found" });
});

app.put('/add/:id', verifyToken, async (req: Request, res: Response) => {
  const events = db.collection("events");
  const users = db.collection("users");
  const event = await events.where("id", '==', req.params.id).limit(1).get();
  const user = await users.doc(await getTokenId(req)).get();
  if (!event.empty && user.exists) {
    if (event.docs[0].data().visibility == "friends") {
      var creator = await users.where("friendcode", '==', event.docs[0].data().creator).limit(1).get();
      var friends = db.collection("friends");
      var friend = await friends.where("firstuser", '==', creator.docs[0].id).where("seconduser", '==', user.id).get();
      if (!friend.empty || user.data()?.friendcode == event.docs[0].data().creator) {
        const attends = db.collection("attends")
        var mayAlreadyAttend = await attends.where("user", '==', user.id).where("event", '==', event.docs[0].data().id).get();
        if (mayAlreadyAttend.size > 0) {
          return res.status(303).json({ error: "Already attending" });
        }
        var attend: typeof AttendsFields = { user: user.id, event: event.docs[0].data().id }
        attends.add(attend)
        return res.status(200).json({ success: true });
      } else {
        return res.status(303).json({ error: "Not friends" });
      }
    } else {
      const attends = db.collection("attends")
      var mayAlreadyAttend = await attends.where("user", '==', user.id).where("event", '==', event.docs[0].data().id).get();
      if (mayAlreadyAttend.size > 0) {
        return res.status(303).json({ error: "Already attending" });
      }
      var attend: typeof AttendsFields = { user: user.id, event: event.docs[0].data().id }
      attends.add(attend)
      return res.status(200).json({ success: true });
    }
  }
  return res.status(300).json({ error: "Event or User not found" });
});

app.delete('/remove/:id', verifyToken, async (req: Request, res: Response) => {
  const events = db.collection("events");
  const users = db.collection("users");
  const event = await events.where("id", '==', req.params.id).limit(1).get();
  const user = await users.doc(await getTokenId(req)).get();
  if (!event.empty && user.exists) {
    const attends = db.collection("attends");
    var attendance = await attends.where("user", '==', user.id).where("event", '==', event.docs[0].data().id).get();
    if (attendance.size > 0) {
      attendance.forEach(doc => { doc.ref.delete() })
      return res.status(200).json({ success: true });
    }
    return res.status(201).json({ message: "User not attending" });
  }
  return res.status(300).json({ error: "Event or User not found" });
});

export default app;

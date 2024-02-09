// Includes crypto module
import { Request, Response, NextFunction } from "express";
import db from './database';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as crypto from 'crypto';
// Defining algorithm
const algorithm = 'aes-256-cbc';

// Defining key
const key = crypto.randomBytes(32);

// Defining iv
const iv = crypto.randomBytes(16);

// An encrypt function
export function encrypt(text: any) {

  // Creating Cipheriv with its parameter
  let cipher =
    crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
}

// A decrypt function
export function decrypt(text: any) {

  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText =
    Buffer.from(text.encryptedData, 'hex');

  // Creating Decipher
  let decipher = crypto.createDecipheriv(
    algorithm, Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const secret = process.env.SECRET as string || "secret";
    var decoded = jwt.verify(token || "", secret);

    const users = db.collection("users");

    const snapshot = await users.where("id", "==", decrypt((decoded as JwtPayload).id)).get();

    if (!snapshot.empty) {
      next();
    }
    return res.status(404).json({ error: "Unauthorized" });
  } catch (err) {
    return res.status(405).json({ error: "Invalid token" });
  }
}


export async function getTokenId(req: Request) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const secret = process.env.SECRET as string || "secret";
    var decoded = jwt.verify(token || "", secret);
    return decoded.toString() == "" ? null : decrypt((decoded as JwtPayload).id);
  } catch (err) {
    return null;
  }
}

































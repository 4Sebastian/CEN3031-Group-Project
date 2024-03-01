// Includes crypto module
import { Request, Response, NextFunction } from "express";
import db from './database';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as crypto from 'crypto';
// Defining algorithm
const algorithm = 'aes-256-cbc';

// An encrypt function
export function encrypt(text: any) {
  const salt = crypto.randomBytes(32);
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY as string || "secret", salt, 32);

  // Defining iv
  const iv = crypto.randomBytes(16);
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
    salt: salt.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
}

// A decrypt function
export function decrypt(text: any) {
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY as string || "secret", Buffer.from(text.salt, 'hex'), 32);

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
  var id = await getTokenId(req);
  const user = db.collection("users").doc(id);
  if (user != null) {
    console.log("verified user")
    next();
  } else {
    return res.status(404).json({ error: "Unauthorized" });
  }
  return;
}


export async function getTokenId(req: Request) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const secret = process.env.SECRET as string || "secret";
    var decoded = jwt.verify(token || "", secret);
    return decrypt((decoded as JwtPayload).id) || "";
  } catch (err) {
    return "";
  }
}

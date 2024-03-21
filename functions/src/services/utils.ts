import { Request } from "express";

export interface UserFieldType {
  [key: string]: string; // All fields are strings
}
export interface UserRequireType {
  [key: string]: boolean;
}

export function validateRecord(req: Request<any, any, UserFieldType>, fields: UserFieldType, required: UserRequireType): boolean {
  const body = req.body;

  for (const field in fields) {
    if (field! in required || (field in required && !required[field])) {
      continue;
    }
    if (typeof body[field] !== fields[field]) {
      return false;
    }
  }

  return true;
}

export function getRecord(body: any, fields: UserFieldType): (typeof fields) {
  var info: typeof fields = {};
  for (const field in fields) {
    info[field] = body[field];
  }
  return info;
}



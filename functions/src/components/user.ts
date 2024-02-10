import { Request } from "express";
interface UserFieldType {
  [key: string]: any; // All fields are strings
}

export var UserFields: UserFieldType = {
  username: 'string',
  email: 'string',
  password: 'string',
  // Add more fields here
};

export function getUser(body: any): (typeof UserFields) {
  var info: typeof UserFields = {};
  for (const field in UserFields) {
    info[field] = body[field];
  }
  return info;
}

export function validateUserCreationRequestBody(req: Request<any, any, UserFieldType>): boolean {
  const body = req.body;

  for (const field in UserFields) {
    if (typeof body[field] !== UserFields[field]) {
      return false;
    }
  }

  return true;
}


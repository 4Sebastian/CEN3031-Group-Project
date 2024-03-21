import { Request } from "express";
import { getRecord, UserFieldType, UserRequireType, validateRecord } from "../services/utils";

export var UserFields: UserFieldType = {
  username: 'string',
  email: 'string',
  password: 'string',
  name: 'string',
  friendcode: 'string',
  profilePic: 'string',
  skilllevel: 'string',
  homerink: 'string'
};

export var requiredUserFields: UserRequireType = {
  username: true,
  email: true,
  password: true,
}

export function getUser(body: any) {
  return getRecord(body, UserFields)
}

export function validateUserCreationRequestBody(req: Request<any, any, UserFieldType>) {
  return validateRecord(req, UserFields, requiredUserFields)
}

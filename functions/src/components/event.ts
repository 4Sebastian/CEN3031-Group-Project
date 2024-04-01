import { getRecord, UserFieldType, UserRequireType, validateRecord } from "../services/utils";
import { Request } from "express";

export var EventFields: UserFieldType = {
  id: 'string',
  name: 'string',
  creator: 'string',
  datetime: 'string',
  recommendedskilllevel: 'string',
  location: 'string',
  visibility: 'string'
};

export var requiredEventFields: UserRequireType = {
  id: false,
  name: true,
  datetime: true,
  location: true,
}

export function getEvent(body: any) {
  return getRecord(body, EventFields)
}

export function validateEventBody(req: Request<any, any, UserFieldType>) {
  return validateRecord(req, EventFields, requiredEventFields);
}

import { getRecord, UserFieldType, UserRequireType, validateRecord } from "../services/utils";
import { Request } from "express";

export var EventFields: UserFieldType = {
  id: 'string',
  creator: 'string',
  datetime: 'Date',
  recommendedskilllevel: 'string',
  location: 'string',
  visibility: 'string'
};

export var requiredEventFields: UserRequireType = {
  id: false,
  datetime: true,
  location: true,
}

export function getEvent(body: any) {
  return getRecord(body, EventFields)
}

export function validateEventBody(req: Request<any, any, UserFieldType>) {
  return validateRecord(req, EventFields, requiredEventFields);
}

import { httpRequest, HttpMethod, setBearerToken, HttpResponse } from "./apiRequests";

const url = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const eventUrl = `${url}/events`;

export async function getEventInfo(id: string): Promise<HttpResponse> {
  return httpRequest(`${eventUrl}/getInfo/${id}`, HttpMethod.GET);
}

export async function getPublicEvents(): Promise<HttpResponse> {
  return httpRequest(`${eventUrl}/getAll`, HttpMethod.GET);
}

export async function getPrivateEvents(): Promise<HttpResponse> {
  return httpRequest(`${eventUrl}/getAllPrivate`, HttpMethod.GET);
}

type EventData = {
  name: string,
  datetime: string,
  recommendedskilllevel: string,
  location: string,
  visibility: string | undefined
}

export async function createEvent(eventData: EventData): Promise<HttpResponse> {
  return httpRequest(`${eventUrl}/create`, HttpMethod.POST, eventData);
}

export async function deleteEvent(id: string): Promise<HttpResponse> {
  return httpRequest(`${eventUrl}/delete/${id}`, HttpMethod.DELETE);
}

export async function updateEvent(id: string, eventData: EventData): Promise<HttpResponse> {
  return httpRequest(`${eventUrl}/update/${id}`, HttpMethod.PUT, eventData);
}

export async function joinEvent(id: string): Promise<HttpResponse> {
  return httpRequest(`${eventUrl}/add/${id}`, HttpMethod.PUT);
}

export async function leaveEvent(id: string): Promise<HttpResponse> {
  return httpRequest(`${eventUrl}/remove/${id}`, HttpMethod.DELETE);
}


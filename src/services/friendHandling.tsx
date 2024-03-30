import { httpRequest, HttpMethod, HttpResponse } from "./apiRequests";

const url = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const friendUrl = `${url}/friends`;

export async function getFriends(): Promise<HttpResponse> {
  return httpRequest(`${friendUrl}/list`, HttpMethod.GET);
}

export async function addFriend(friendcode: string): Promise<HttpResponse> {
  return httpRequest(`${friendUrl}/add`, HttpMethod.POST, { friendcode: friendcode });
}

export async function removeFriend(friendcode: string): Promise<HttpResponse> {
  return httpRequest(`${friendUrl}/remove`, HttpMethod.DELETE, { friendcode: friendcode });
}


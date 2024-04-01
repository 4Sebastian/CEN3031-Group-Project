import { httpRequest, HttpMethod, setBearerToken, HttpResponse, getBearerToken } from "./apiRequests";

const url = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const userUrl = `${url}/users`;

export async function login(username: string, password: string): Promise<HttpResponse> {
  var response = await httpRequest(`${userUrl}/login`, HttpMethod.POST, { username: username, password: password });
  if (response.status == 200) {
    setBearerToken(response.data.token);
  }
  return response;
}

export function logout() {
  setBearerToken("");
}

export function isLoggedIn(): boolean {
  return Boolean(getBearerToken());
}

export async function getInfo(): Promise<HttpResponse> {
  return httpRequest(`${userUrl}/getInfo`, HttpMethod.GET);
}

export async function update(data: any): Promise<HttpResponse> {
  return httpRequest(`${userUrl}/update`, HttpMethod.PUT, data);
}

type passwordType = {
  organizationId: string,
  password: string,
  newPassword: string
}

export async function changePassword(data: passwordType): Promise<HttpResponse> {
  return httpRequest(`${userUrl}/changePassword`, HttpMethod.PUT, data);
}

type userType = {
  organizationId: string,
  username: string,
  email: string,
  password: string
}

export async function create(data: userType): Promise<HttpResponse> {
  return httpRequest(`${userUrl}/create`, HttpMethod.POST, data);
}

export async function deleteUser(): Promise<HttpResponse> {
  return httpRequest(`${userUrl}/delete`, HttpMethod.DELETE);
}

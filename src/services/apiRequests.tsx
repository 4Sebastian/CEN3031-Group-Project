/**
 * Defines valid HTTP methods.
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * Represents an HTTP response.
 * @param status - The HTTP status code.
 * @param statusText - The HTTP status text.
 * @param data - The response data.
 */
export interface HttpResponse {
  status: number;
  statusText: string;
  data?: any;
}

/**
 * Sets the bearer token in the local storage.
 * @param token - The bearer token to set.
 */
export function setBearerToken(token: string) {
  localStorage.setItem('userToken', token);
}

export function getBearerToken(){
  return localStorage.getItem('userToken')
}

/**
 * Makes an HTTP request.
 * @param url - The URL to make the request to.
 * @param method - The HTTP method to use (GET, POST, PUT, DELETE).
 * @param body - Optional request body.
 * @returns A promise that resolves to the HTTP response.
 */
export async function httpRequest(url: string, method: HttpMethod, body?: any): Promise<HttpResponse> {
  try {
    const response = await fetch(url, {
      method,
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseData = await response.json();

    return {
      status: response.status,
      statusText: response.statusText,
      data: responseData,
    };
  } catch (error) {
    console.log(`HTTP error: ${error}`);
    return {
      status: 500,
      statusText: `HTTP error: ${error}`,
      data: error
    }
    //throw new Error(`HTTP error: ${error}`);
  }
}

/**
 * Retrieves the headers for the HTTP request.
 * @returns An object containing the headers.
 */
function getHeaders(): { [headerName: string]: string; } {
  return {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('userToken') ? `Bearer ${localStorage.getItem('userToken')}` : '',
  };
}

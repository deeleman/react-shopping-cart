/* eslint-disable @typescript-eslint/no-magic-numbers */
/**
 * Http Status mapping enum
 */
enum HttpStatus {
  Success     = 200,
  Redirect    = 300,
  ClientError = 400,
  ServerError = 500
}
/* eslint-enable @typescript-eslint/no-magic-numbers */

/**
 * General purpose network client for submitting GET request to a given endpoint URL with extended support for typed responses
 * @param endpointUrl URL of remote resource
 * @returns Typed promise with response output, featuring error handling functionality
 */
export const httpService = async <T>(endpointUrl: string): Promise<T> => {
  return fetch(endpointUrl)
    .then((response: Response) => {
      if (response.ok && response.status >= HttpStatus.Success && response.status < HttpStatus.Redirect) {
        return response.json();
      } else {
        const errorMessage = !response.ok ? 'Invalid Response' : `Http Error ${response.status}`;
        throw new Error(errorMessage);
      }
    })
    .then((data) => data as T)
    .catch((error: Error) => Promise.reject(error));
};

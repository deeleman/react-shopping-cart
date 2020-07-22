import { httpService } from './http-service';

export type DataSettings = Record<string, string>;

/**
 * General purpose data client that abstracts multiple data fwtch requests to different endpoints and returns a hash map of responses
 * @param settings Key/value object mapping string keys to string URL endpoints
 * @returns T-typed hash map with keys matching those from {settings} mapped to API response objects
 */
export const dataService = <T>(settings: DataSettings): Promise<T> => {
  const keys = Object.keys(settings);
  const asynchttpServices = Object.values(settings).map(httpService);

  return Promise
    .all(asynchttpServices)
    .catch((error: Error) => Promise.reject(error.message))
    .then((responsesArray) => responsesArray.reduce(
      (responsesObject: any, response: unknown, index: number) => { // eslint-disable-line @typescript-eslint/no-any
        const responseEntryKey = keys[index];
        responsesObject[responseEntryKey] = response;

        return responsesObject;
      },
      {}
    ) as T);
};

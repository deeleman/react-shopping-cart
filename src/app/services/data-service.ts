import { httpService } from './http-service';

/**
 * General purpose data client that abstracts multiple data fwtch requests to different endpoints and returns a hash map of responses
 * @param settings Key/value object mapping string keys to string URL endpoints
 * @returns T-typed hash map with keys matching those from {settings} mapped to API response objects
 */
export const dataService = async <T>(settings: Record<keyof T, string>): Promise<T> => {
  const keys = Object.keys(settings);
  const asyncHttpServices = Object.values<string>(settings).map(httpService);

  return Promise
    .all(asyncHttpServices)
    .catch((error: Error) => Promise.reject(error))
    .then((responsesArray) => responsesArray.reduce(
      (responsesObject: Partial<T>, response: unknown, index: number) => ({
        ...responsesObject,
        ...{ [keys[index]]: response }
      }),
      {}
    ) as unknown as T);
};

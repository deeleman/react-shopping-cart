import * as productItemsFixtures from 'shopping-cart/api/fixtures/product-items';
import { httpService } from '../http-service';

describe('httpService', () => {
  let fetchSpy: jest.SpyInstance<Promise<unknown>>;
  const endpointUrlMock = 'https://test.dev/api/v1/data';

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: jest.fn().mockReturnValue(productItemsFixtures)
  });

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  afterEach(() => jest.clearAllMocks());

  it('should pass a valid request URL to the fetch middleware', () => {
    httpService(endpointUrlMock);

    expect(fetchSpy)
      .toHaveBeenCalledWith('https://test.dev/api/v1/data');
  });

  it('should return a valid product items recordset if the API responds successfully', async () => {
    const apiResponse = await httpService(endpointUrlMock);

    expect(apiResponse)
      .toEqual(productItemsFixtures);
  });

  it('should statically type the returning recordset if the API responds successfully', async () => {
    type expectedType = Array<{ id: string; code: string; name: string; price: number }>;
    const isExpectedType = (input: any): input is expectedType =>
      (input as expectedType)[0].id !== undefined &&
      (input as expectedType)[0].code !== undefined &&
      (input as expectedType)[0].name !== undefined &&
      (input as expectedType)[0].price !== undefined;

    const apiResponse = await httpService<expectedType>(endpointUrlMock);

    expect(isExpectedType(apiResponse))
      .toBeTruthy();
  });

  it('should reject the returning promise if the fetch middleware throws an exception', async () => {
    fetchSpy.mockRejectedValue(new Error('test error'));

    await expect(httpService(endpointUrlMock)).rejects.toThrow('test error');
  });

  it('should reject the returning promise if the response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(httpService(endpointUrlMock)).rejects.toThrow('Invalid Response');
  });

  it('should reject the returning promise if the response HTTP status is below 200', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 190,
      ok: true,
    });

    await expect(httpService(endpointUrlMock)).rejects.toThrow('Http Error 190');
  });

  it('should reject the returning promise if the response HTTP status is equals or above 300', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 300,
      ok: true,
    });

    await expect(httpService(endpointUrlMock)).rejects.toThrow('Http Error 300');

    global.fetch = jest.fn().mockResolvedValue({
      status: 404,
      ok: true,
    });

    await expect(httpService(endpointUrlMock)).rejects.toThrow('Http Error 404');

    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      ok: true,
    });

    await expect(httpService(endpointUrlMock)).rejects.toThrow('Http Error 500');
  });
});
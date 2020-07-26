import * as productItemsFixtures from 'shopping-cart/api/fixtures/product-items';
import * as productDiscountFixtures from 'shopping-cart/api/fixtures/product-discounts';

import { httpService } from './http-service';
import { dataService } from './data-service';

jest.mock('./http-service', () => ({ httpService: jest.fn() }));

describe('dataService', () => {
  const itemsEndpointUrlMock     = 'https://test.dev/api/v1/items';
  const discountsEndpointUrlMock = 'https://test.dev/api/v1/discounts';
  
  beforeAll(() => {
    (httpService as jest.Mock).mockImplementation((endpointUrl: string) => {
      let response: Response;
      if (endpointUrl === itemsEndpointUrlMock || endpointUrl === discountsEndpointUrlMock) {
        response = endpointUrl === itemsEndpointUrlMock ? productItemsFixtures : productDiscountFixtures;
      }

      return response ? Promise.resolve(response) : Promise.reject(new Error('Http Error 404'));
    });
  });

  afterEach(() => (httpService as jest.Mock).mockClear());

  it('should return a single valid key/value pair with a matching endpoint key property and its API response', async () => {
    const testPayload = {
      items: itemsEndpointUrlMock,
    };

    const response = await dataService(testPayload);

    expect(response).toEqual({
      items: productItemsFixtures,
    });
  });

  it('should return a multiple valid key/value pair with matching endpoint key properties and its API response', async () => {
    const testPayload = {
      items: itemsEndpointUrlMock,
      discounts: discountsEndpointUrlMock,
    };

    const response = await dataService(testPayload);

    expect(response).toEqual({
      items: productItemsFixtures,
      discounts: productDiscountFixtures,
    });
  });

  it('should reject the returned promise if the underlying HTTP handler throws an error', async () => {
    const testPayload = {
      items: itemsEndpointUrlMock,
      discounts: discountsEndpointUrlMock,
      fakeToken: 'https://test.dev/api/v1/removed-endpoint'
    };

    const promiseRejectSpy = jest.fn();
    await dataService(testPayload).then(void 0, promiseRejectSpy);
    
    expect(promiseRejectSpy).toHaveBeenCalledWith(new Error('Http Error 404'));
  });
});
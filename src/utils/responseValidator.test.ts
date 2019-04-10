import { IFetchedItem } from '../models/IFetchedItem';
import {
  validateDeleteResponse,
  validateGetResponse,
  validatePostResponse,
  validatePutResponse,
} from './responseValidator';
import 'isomorphic-fetch';

describe('Validate get response', () => {
  it('should return json if status code is 200 and ok is true', () => {
    const response = new Response(
      '[]',
      {
        'status': 200,
        'statusText': 'OK',
      });
    const expectedResult: IFetchedItem[] = [];

    return validateGetResponse(response).then(result =>
      expect(result).toEqual(expectedResult));
  });

  it('should throw error if status code is not 200', () => {
    const response = new Response(
      '[]',
      {
        'status': 504,
        'statusText': 'OK',
      });

    return validateGetResponse(response)
      .catch(error => expect(error).toBeTruthy());
  });
});

describe('Validate post response', () => {
  it('should return json if status code is 201', () => {
    const validResponse = new Response(
      '{}',
      {
        'status': 201,
      });
    const expectedResult = {};

    return validatePostResponse(validResponse).then(result =>
      expect(result).toEqual(expectedResult));
  });

  it('should throw error if status code is not 201', () => {
    const invalidResponse = new Response(
      '{}',
      {
        'status': 504,
      });

    return validatePostResponse(invalidResponse).catch(
      error => expect(error).toBeTruthy(),
    );
  });
});

describe('Validate delete response', () => {
  it('should throw exception if status code is not 204', () => {
      const invalidResponse = new Response(
        '{}',
        {
          'status': 404,
        });

      expect(() => validateDeleteResponse(invalidResponse)).toThrow('Invalid response');
    },
  );

  it('should not throw exception if status code is 204', () => {
    const deleteResponse = new Response(
      '{}',
      {
        'status': 204,
      });

    validateDeleteResponse(deleteResponse);
  });
});

describe('Validate put response', () => {
  it('should return json if status code is 200', () => {
    const validResponse = new Response(
      '{}',
      {
        'status': 200,
      });
    const expectedResult = {};

    return validatePutResponse(validResponse).then(result =>
      expect(result).toEqual(expectedResult));
  });

  it('should throw error if status code is not 200', () => {
    const invalidResponse = new Response(
      '{}',
      {
        'status': 504,
      });

    return validatePutResponse(invalidResponse).catch(
      error => expect(error).toBeTruthy(),
    );
  });
});

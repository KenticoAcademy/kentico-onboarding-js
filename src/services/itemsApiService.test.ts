import { itemsApiService } from './itemsApiService';
import { GUID_EMPTY, ITEMS_API_URL } from '../constants/constants';

const resolvesIfUrlCorrect = (url: string, resolve: any, json: any) => {
  if (url === ITEMS_API_URL) {
    resolve({ ok: true, json: () => json }  as Response);
  }
};

describe('getItems', () => {
  it('calls correct url and returns json result', async () => {
    const json = { x: 123, y: 987 };
    const urlFetch = (url: string) => new Promise<Response>(resolve => resolvesIfUrlCorrect(url, resolve, json));

    const response = await itemsApiService(urlFetch).getItems();
    expect(response).toEqual(json);
  });

  it('throws error on empty response', async () => {
    expect.assertions(1);
    const urlFetch = () => new Promise<Response>(resolve => resolve());

    try {
      await itemsApiService(urlFetch).getItems();
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  it('throws error with statusText on not ok', async () => {
    expect.assertions(1);
    const error = 'reject error';

    const urlFetch = () => new Promise<Response>(resolve => resolve({ ok: false, statusText: error } as Response));

    try {
      await itemsApiService(urlFetch).getItems();
    } catch (e) {
      expect(e.message).toEqual(error);
    }
  });

  it('throws error on reject', async () => {
    expect.assertions(1);
    const error = 'reject error';
    const urlFetch = () => Promise.reject(error);

    try {
      await itemsApiService(urlFetch).getItems();
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});

describe('postItem', () => {
  it('calls correct url, creates http options correctly', async () => {
    const text = { text: 'new' };
    const expected = {
      method: 'POST',
      body: JSON.stringify(text),
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const urlFetch = (url: string, options: any) => new Promise<Response>(resolve => resolvesIfUrlCorrect(url, resolve, options));

    const result = await itemsApiService(urlFetch).postItem('new');
    expect(result).toEqual(expected);
  });

  it('throws error on empty response', async () => {
    expect.assertions(1);
    const urlFetch = () => new Promise<Response>(resolve => resolve());

    try {
      await itemsApiService(urlFetch).postItem('new');
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  it('throws error with statusText on not ok', async () => {
    expect.assertions(1);
    const error = 'reject error';

    const urlFetch = () => new Promise<Response>(resolve => resolve({ ok: false, statusText: error } as Response));

    try {
      await itemsApiService(urlFetch).postItem('new');
    } catch (e) {
      expect(e.message).toEqual(error);
    }
  });

  it('throws error on reject', async () => {
    const error = 'reject error';

    const urlFetch = () => Promise.reject(error);

    try {
      await itemsApiService(urlFetch).postItem('new');
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});

describe('putItem', () => {
  it('calls correct url, creates http options correctly', async () => {
    const resolution = { ok: true } as Response;
    const text = { text: 'updated' };
    const expected = {
      method: 'PUT',
      body: JSON.stringify(text),
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const urlFetch = (url: string, options: any) => new Promise<Response>(resolve => {
      if (url === ITEMS_API_URL + GUID_EMPTY) {
        expect(options).toEqual(expected);
        resolve(resolution);
      }
    });

    const result = await itemsApiService(urlFetch).putItem(GUID_EMPTY, text.text);
    expect(result).toEqual(resolution);
  });

  it('throws error on empty response', async () => {
    const urlFetch = () => new Promise<Response>(resolve => resolve());

    try {
      await itemsApiService(urlFetch).putItem('x', 'new');
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  it('throws error with statusText on not ok', async () => {
    const error = 'reject error';

    const urlFetch = () => new Promise<Response>(resolve => resolve({ ok: false, statusText: error } as Response));

    try {
      await itemsApiService(urlFetch).putItem('x', 'new');
    } catch (e) {
      expect(e.message).toEqual(error);
    }
  });

  it('throws error on reject', async () => {
    const error = 'reject error';

    const urlFetch = () => Promise.reject(error);

    try {
      await itemsApiService(urlFetch).putItem('x', 'new');
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});

describe('deleteItem', () => {
  it('calls correct url, creates http options correctly', async () => {
    const expectedResolution = { ok: true } as Response;
    const expectedOptions = { method: 'DELETE' };

    const urlFetch = (url: string, options: any) => new Promise<Response>(resolve => {
      if (url === ITEMS_API_URL + GUID_EMPTY) {
        expect(options).toEqual(expectedOptions);
        resolve(expectedResolution);
      }
    });

    const result = await itemsApiService(urlFetch).deleteItem(GUID_EMPTY);

    expect(result).toEqual(expectedResolution);
  });

  it('throws error on empty response', async () => {
    const urlFetch = () => new Promise<Response>(resolve => resolve());

    try {
      await itemsApiService(urlFetch).deleteItem('x');
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  it('throws error with statusText on not ok', async () => {
    const error = 'reject error';
    const urlFetch = () => new Promise<Response>(resolve => resolve({ ok: false, statusText: error } as Response));

    try {
      await itemsApiService(urlFetch).deleteItem('x');
    } catch (e) {
      expect(e.message).toEqual(error);
    }
  });

  it('throws error on reject', async () => {
    const error = 'reject error';
    const urlFetch = () => Promise.reject(error);

    try {
      await itemsApiService(urlFetch).deleteItem('x');
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});

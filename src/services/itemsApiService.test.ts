import { itemsApiService } from './itemsApiService';
import { GUID_EMPTY, ITEMS_API_URL } from '../constants/constants';

describe('getItems works correctly', () => {
  it('calls correct url and returns json result', async () => {
    const json = { x: 123, y: 987 };
    const urlFetch = (url: string) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL) {
          resolve({ ok: true, json: () => json });
        }
      });
    };

    const response = await itemsApiService(urlFetch).getItems();

    expect(response).toBe(json);
  });

  it('throws error on reject', async () => {
    const error = 'reject error';
    const urlFetch = () => Promise.reject(error);

    try {
      await itemsApiService(urlFetch).getItems();
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });

  it('throws error with statusText on not ok', async () => {
    const error = 'reject error';

    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    try {
      await itemsApiService(urlFetch).getItems();
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });
});

describe('postItem works correctly', () => {
  it('calls correct url, creates http options correctly', async () => {
    const text = { text: 'new' };
    const expected = {
      method: 'POST',
      body: JSON.stringify(text),
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const urlFetch = (url: string, options: any) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL) {
          resolve({ ok: true, json: () => options });
        }
      });
    };

    const result = await itemsApiService(urlFetch).postItem('new');

    expect(result).toEqual(expected);
  });

  it('throws error on reject', async () => {
    const error = 'reject error';

    const urlFetch = () => Promise.reject(error);

    try {
      await itemsApiService(urlFetch).postItem('new');
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });

  it('throws error with statusText on not ok', async () => {
    const error = 'reject error';

    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    try {
      await itemsApiService(urlFetch).postItem('new');
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });
});

describe('putItem works correctly', () => {
  it('calls correct url, creates http options correctly', async () => {
    const resolution = { ok: true };
    const text = { text: 'updated' };
    const expected = {
      method: 'PUT',
      body: JSON.stringify(text),
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const urlFetch = (url: string, options: any) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL + GUID_EMPTY) {
          expect(options).toEqual(expected);
          resolve(resolution);
        }
      });
    };

    const result = await itemsApiService(urlFetch).putItem(GUID_EMPTY, text.text);

    expect(result).toBe(resolution);
  });

  it('throws error on reject', async () => {
    const error = 'reject error';

    const urlFetch = () => Promise.reject(error);

    try {
      await itemsApiService(urlFetch).putItem('x', 'new');
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });

  it('throws error with statusText on not ok', async () => {
    const error = 'reject error';

    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    try {
      await itemsApiService(urlFetch).putItem('x', 'new');
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });
});

describe('deleteItem works correctly', () => {
  it('calls correct url, creates http options correctly', async () => {
    const expectedResolution = { ok: true };
    const expectedOptions = { method: 'DELETE' };

    const urlFetch = (url: string, options: any) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL + GUID_EMPTY) {
          expect(options).toEqual(expectedOptions);
          resolve(expectedResolution);
        }
      });
    };

    const result = await itemsApiService(urlFetch).deleteItem(GUID_EMPTY);

    expect(result).toBe(expectedResolution);
  });

  it('throws error on reject', async () => {
    const error = 'reject error';

    const urlFetch = () => Promise.reject(error);

    try {
      await itemsApiService(urlFetch).deleteItem('x');
    } catch (e) {
      expect(e.message).toEqual(error);
    }
  });

  it('throws error with statusText on not ok', async () => {
    const error = 'reject error';

    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    try {
      await itemsApiService(urlFetch).deleteItem('x');
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });
});

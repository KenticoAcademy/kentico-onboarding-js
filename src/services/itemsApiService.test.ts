import { ItemsApiService } from './itemsApiService';
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

    const service = new ItemsApiService(urlFetch);
    const response = await service.getItems();

    expect(response).toBe(json);
  });

  it('throws error on reject', async () => {
    const error = 'reject error';
    const urlFetch = () => Promise.reject(error);

    const service = new ItemsApiService(urlFetch);
    try {
      await service.getItems();
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

    const service = new ItemsApiService(urlFetch);

    try {
      await service.getItems();
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

    const service = new ItemsApiService(urlFetch);
    const result = await service.postItem('new');

    expect(result).toEqual(expected);
  });

  it('throws error on reject', async () => {
    const error = 'reject error';

    const urlFetch = () => Promise.reject(error);

    const service = new ItemsApiService(urlFetch);
    try {
      await service.postItem('new');
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

    const service = new ItemsApiService(urlFetch);
    try {
      await service.postItem('new');
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

    const service = new ItemsApiService(urlFetch);
    const result = await service.putItem(GUID_EMPTY, text.text);

    expect(result).toBe(resolution);
  });

  it('throws error on reject', async () => {
    const error = 'reject error';

    const urlFetch = () => Promise.reject(error);

    const service = new ItemsApiService(urlFetch);
    try {
      await service.putItem('x', 'new');
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

    const service = new ItemsApiService(urlFetch);
    try {
      await service.putItem('x', 'new');
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

    const service = new ItemsApiService(urlFetch);
    const result = await service.deleteItem(GUID_EMPTY);

    expect(result).toBe(expectedResolution);
  });

  it('throws error on reject', async () => {
    const error = 'reject error';

    const urlFetch = () => Promise.reject(error);

    const service = new ItemsApiService(urlFetch);
    try {
      await service.deleteItem('x');
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

    const service = new ItemsApiService(urlFetch);
    try {
      await service.deleteItem('x');
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });
});

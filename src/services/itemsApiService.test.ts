import { Promise } from 'es6-promise';

import { ItemsApiService } from './itemsApiService';
import { GUID_EMPTY, ITEMS_API_URL } from '../constants/constants';

describe('getItems works correctly', () => {
  it('calls correct url and returns json result', () => {
    const json = { x: 123, y: 987 };
    const urlFetch = (url: string) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL) {
          resolve({ ok: true, json: () => json });
        }
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.getItems()
      .then((result) => expect(result).toBe(json));
  });

  it('throws error on reject', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((reject: any) => {
        reject(error);
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.getItems()
      .catch(result => expect(result).toBe(error));
  });

  it('throws error with statusText on not ok', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.getItems()
      .catch(result => expect(result).toBe(error));
  });
});

describe('getItem works correctly', () => {
  it('calls correct url and returns json result', () => {
    const json = { x: 123, y: 987 };
    const urlFetch = (url: string) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL + GUID_EMPTY) {
          resolve({ ok: true, json: () => json });
        }
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.getItem(GUID_EMPTY)
      .then((result) => expect(result).toBe(json));
  });

  it('throws error on reject', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((reject: any) => {
        reject(error);
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.getItems()
      .catch(result => expect(result).toBe(error));
  });

  it('throws error with statusText on not ok', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.getItem(GUID_EMPTY)
      .catch(result => expect(result).toBe(error));
  });
});

describe('postItem works correctly', () => {
  it('calls correct url and returns json result', () => {
    const json = { x: 123, y: 987 };
    const urlFetch = (url: string) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL) {
          resolve({ ok: true, json: () => json });
        }
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.postItem('new')
      .then((result) => expect(result).toBe(json));
  });

  it('throws error on reject', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((reject: any) => {
        reject(error);
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.postItem('new')
      .catch(result => expect(result).toBe(error));
  });

  it('throws error with statusText on not ok', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.postItem('new')
      .catch(result => expect(result).toBe(error));
  });
});

describe('putItem works correctly', () => {
  it('calls correct url and returns json result', () => {
    const json = { x: 123, y: 987 };
    const urlFetch = (url: string) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL + GUID_EMPTY) {
          resolve({ ok: true, json: () => json });
        }
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.putItem(GUID_EMPTY, 'update')
      .then((result) => expect(result).toBe(json));
  });

  it('throws error on reject', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((reject: any) => {
        reject(error);
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.putItem(GUID_EMPTY, 'update')
      .catch(result => expect(result).toBe(error));
  });

  it('throws error with statusText on not ok', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.putItem(GUID_EMPTY, 'update')
      .catch(result => expect(result).toBe(error));
  });
});

describe('deleteItem works correctly', () => {
  it('calls correct url and returns json result', () => {
    const json = { x: 123, y: 987 };
    const urlFetch = (url: string) => {
      return new Promise<Response>((resolve: any) => {
        if (url === ITEMS_API_URL + GUID_EMPTY) {
          resolve({ ok: true, json: () => json });
        }
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.deleteItem(GUID_EMPTY)
      .then((result) => expect(result).toBe(json));
  });

  it('throws error on reject', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((reject: any) => {
        reject(error);
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.deleteItem(GUID_EMPTY)
      .catch(result => expect(result).toBe(error));
  });

  it('throws error with statusText on not ok', () => {
    const error = 'reject error';
    const urlFetch = () => {
      return new Promise<Response>((resolve: any) => {
        resolve({ ok: false, statusText: error });
      });
    };

    const service = new ItemsApiService(urlFetch);

    service.deleteItem(GUID_EMPTY)
      .catch(result => expect(result).toBe(error));
  });
});

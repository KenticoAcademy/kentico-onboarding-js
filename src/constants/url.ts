const SUBDOMAIN = 'lindal-todoapp';
const DOMAIN = '.azurewebsites.net';
const PORT = '';
const API = '/api/v1';
const ENDPOINT = '/items';

export const getApiUrl = (): RequestInfo =>
  'http://' + SUBDOMAIN  + DOMAIN + PORT + API + ENDPOINT;

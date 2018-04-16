const SUBDOMAIN = "";
const DOMAIN = "localhost";
const PORT = "54816";
const API = "/api/v1";
const ENDPOINT = "/itemlist";

export const getApiUrl = (): RequestInfo =>
  "http://" + SUBDOMAIN + "." + DOMAIN + ":" + PORT + API + ENDPOINT;

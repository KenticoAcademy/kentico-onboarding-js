export {};

declare global {
  type Guid = string;
  type ErrorAction = 'POST' | 'PUT' | 'DELETE';
  type Fetch = (input: string, init: RequestInit) => Promise<Response>;
}

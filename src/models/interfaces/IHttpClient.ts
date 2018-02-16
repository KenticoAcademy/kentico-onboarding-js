export interface IHttpClient {
  get<T = any>(url: string): Promise<T>;
  delete(url: string): Promise<void>;
  post<T = any>(url: string, data?: any): Promise<T>;
  put<T = any>(url: string, data?: any): Promise<T>;
  patch<T = any>(url: string, data?: any): Promise<T>;
}

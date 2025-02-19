import { apiUrl } from "@utils/env";

type TypedResponse<T> = Omit<Response, "json"> & {
  json(): Promise<T>;
};

let cachedClient: Client | null = null;

export const useClient = (): Client => {
  if (!cachedClient) {
    cachedClient = new Client();
  }
  return cachedClient;
};

export class Client {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor() {
    this.baseUrl = apiUrl;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  private async request<T>(
    path: string,
    options: RequestInit
  ): Promise<TypedResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      credentials: "include",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response as TypedResponse<T>;
  }

  async get<T>(path: string, params?: Record<string, any>) {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request<T>(`${path}${queryString}`, { method: "GET" });
  }

  async post<T>(path: string, body: unknown) {
    return this.request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async put<T>(path: string, body: unknown) {
    return this.request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async delete(path: string) {
    return this.request<void>(path, { method: "DELETE" });
  }
}

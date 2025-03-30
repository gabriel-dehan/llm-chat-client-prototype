import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";

import { apiUrl } from "@utils/env";

import { APIError } from "../errors/api.error";

type TypedResponse<T> = Omit<Response, "json"> & {
  json(): Promise<T>;
};

export class Client {
  private readonly baseUrl: string;
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

  private getHeaders() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  private async request<T>(
    path: string,
    options: Record<string, any>
  ): Promise<TypedResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new APIError(response.status, response.statusText, errorData);
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

  async streamRequest<T>(
    path: string,
    options: Record<string, any>,
    {
      onMessage,
      onOpen,
      onClose,
      onError,
      signal,
    }: {
      onMessage: (event: EventSourceMessage) => void;
      onOpen?: (response: Response) => void | Promise<void>;
      onClose?: () => void;
      onError?: (err: Error) => void;
      signal?: AbortSignal;
    }
  ): Promise<void> {
    const url = `${this.baseUrl}${path}`;

    return fetchEventSource(url, {
      ...options,
      headers: this.getHeaders(),
      signal,
      onopen: async (response) => {
        // Make sure the response is ok before calling the onOpen callbackß
        if (!response.ok) {
          const errorData = await response.json();
          throw new APIError(response.status, response.statusText, errorData);
        }

        if (onOpen) {
          await onOpen(response);
        }
      },
      onmessage: onMessage,
      onclose: onClose,
      onerror: onError,
    });
  }
}

let cachedClient: Client | null = null;

export const getClient = (): Client => {
  if (!cachedClient) {
    cachedClient = new Client();
  }
  return cachedClient;
};

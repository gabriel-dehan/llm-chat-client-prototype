export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: any
  ) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.name = "APIError";
  }
}

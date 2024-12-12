export class ExpressError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super();
    this.message = message;
    this.status = status;
    // Set the prototype explicitly (important for custom error classes in TypeScript)
    Object.setPrototypeOf(this, ExpressError.prototype);
  }
}

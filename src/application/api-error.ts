export abstract class CustomError extends Error {
  public abstract readonly statusCode: number;

  protected constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): { message: string; field?: string };
}

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
  }

  serializeErrors() {
    return { message: this.message };
  }
}

export class InternalError extends CustomError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);
  }

  serializeErrors() {
    return { message: this.message };
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);
  }

  serializeErrors(): { message: string } {
    return { message: this.message };
  }
}

export abstract class CustomError extends Error {
  protected constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): { message: string; field?: string };
}

export class BadRequestError extends CustomError {
  constructor(public message: string) {
    super(message);
  }

  serializeErrors() {
    return { message: this.message };
  }
}

export class InternalError extends CustomError {
  constructor(public message: string) {
    super(message);
  }

  serializeErrors() {
    return { message: this.message };
  }
}

export class NotFoundError extends CustomError {
  constructor(public message: string) {
    super(message);
  }

  serializeErrors(): { message: string } {
    return { message: this.message };
  }
}

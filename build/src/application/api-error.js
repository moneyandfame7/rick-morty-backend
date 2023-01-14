export class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}
export class BadRequestError extends CustomError {
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
    serializeErrors() {
        return { message: this.message };
    }
}
export class InternalError extends CustomError {
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
    serializeErrors() {
        return { message: this.message };
    }
}
export class NotFoundError extends CustomError {
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
    serializeErrors() {
        return { message: this.message };
    }
}

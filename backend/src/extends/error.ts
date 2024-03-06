export interface ICustomError {
  status: number;
  message: string;
}

class CustomError extends Error implements ICustomError {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class BadRequest extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class HttpNotFound extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class MySqlError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}

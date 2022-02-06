class HttpException extends Error {
  public status: number;
  public message: string;
  public code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

export default HttpException;

export enum ResponseHttpCode {
  InternalError = "internal_error",
  BadRequest = "bad_request",
  NotFound = "not_found",
  AuthenticationFailure = "authentication_failure",
  Forbidden = "forbidden",
}

export const PayloadHttpResponse = {
  InternalError: {
    status: 500,
    code: "internal_error",
    message: "Internal Server Error",
  },
  BadRequest: {
    status: 400,
    code: "bad_request",
    message: "",
  },
  NotFound: {
    status: 404,
    code: "not_found",
    message: "Not Found",
  },
  AuthenticationFailure: {
    status: 401,
    code: "authentication_failure",
    message: "Authentication Failure",
  },
  Forbidden: {
    status: 403,
    code: "forbidden",
    message: "Forbidden",
  },
};

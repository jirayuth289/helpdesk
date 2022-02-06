import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status: number = error.status || 500;
  const statusMessage = error.message || "Something went wrong";

  console.error(error);
  
  res
    .status(status)
    .json({ object: "error", code: error.code, message: statusMessage });
}

export default errorMiddleware;

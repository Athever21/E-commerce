import { NextFunction, Request, Response} from "express";

export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(err.code)
    .json({ error: err.message});
};

import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    auth?: () => { isAuthorized: boolean };
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.auth?.().isAuthorized) {
    res.status(401).json({ message: "Unauthorized - you must be logged in" });
    return;
  }
  next();
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: string;
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader
    ? authHeader.split(" ")[1]
    : req.cookies.access_token;

  if (!token) {
    return res.status(403).json({
      message: "Permission denied without access token!",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as jwt.JwtPayload & { email: string };

    if (!decoded || !decoded.email) {
      return res.status(403).json({
        message: "Invalid token! Please enter a valid token",
      });
    }

    req.user = decoded.email;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token!",
    });
  }
}

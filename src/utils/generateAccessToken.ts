import jwt from "jsonwebtoken";

export function generateAccessToken(email: string) {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "7d",
  });
}

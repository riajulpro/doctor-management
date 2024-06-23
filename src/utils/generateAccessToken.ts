import jwt from "jsonwebtoken";

export function generateAccessToken(
  email: string,
  secret: string,
  options?: any
) {
  return jwt.sign({ email }, secret, options);
}

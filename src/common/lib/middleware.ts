import jwt from 'jsonwebtoken';

export default function verifyToken(token: string) {
  interface JwtPayload {
    id: string;
  }
  const secret = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(token, secret) as JwtPayload;

  return decoded.id;
}
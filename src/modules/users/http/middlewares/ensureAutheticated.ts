import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const auth = request.headers.authorization;

  if (!auth) {
    throw new Error('JWT Token is missing.');
  }

  const [, token] = auth.split(' ');

  try {
    const decodedToken = verify(token, AuthConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT Token.');
  }
}

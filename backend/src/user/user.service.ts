import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

const AUTH_COOKIE_KEY = 'auth_token';

@Injectable()
export class UserService {
  login(response: Response, username: string): void {
    response.cookie(AUTH_COOKIE_KEY, username, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 24 * 7,
      secure: false,
      path: '/',
    });
  }
  logout(@Res() response: Response): void {
    response.clearCookie(AUTH_COOKIE_KEY);
  }
}

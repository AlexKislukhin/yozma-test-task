import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    request.user = String(request.cookies['auth_token']) || undefined;

    if (!request['user']) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserLoginDTO } from './dto/user-login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() body: UserLoginDTO, @Res() response: Response): void {
    this.userService.login(response, body.username);

    response.send({ ok: true });
  }

  @Post('logout')
  logout(@Res() response: Response): void {
    this.userService.logout(response);

    response.send({ ok: true });
  }
}

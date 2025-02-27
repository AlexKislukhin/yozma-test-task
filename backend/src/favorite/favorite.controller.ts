import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserGuard } from 'src/user/user.guard';
import { Request } from 'express';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(UserGuard)
  @Post()
  create(
    @Req() request: Request,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoriteService.create(request.user!, createFavoriteDto);
  }

  @UseGuards(UserGuard)
  @Get()
  findAll(@Req() request: Request) {
    return this.favoriteService.findAll(request.user!);
  }
}

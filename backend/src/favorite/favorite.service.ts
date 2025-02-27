import { Injectable, Scope } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { DBService } from 'src/db/db.service';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class FavoriteService {
  constructor(private readonly dbService: DBService) {}

  async create(
    user: NonNullable<Request['user']>,
    createFavoriteDto: CreateFavoriteDto,
  ) {
    const db = await this.dbService.getDB();

    db.favorites.push({ user, ...createFavoriteDto });

    await this.dbService.saveDB(db);

    return { ok: true };
  }

  async findAll(user: NonNullable<Request['user']>) {
    const db = await this.dbService.getDB();

    return db.favorites.find((item) => item.user === user);
  }
}

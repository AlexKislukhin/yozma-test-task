import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { SearchHistory } from 'src/search/entities/search.entity';

type DBType = {
  favorites: Favorite[];
  searchHistory: SearchHistory[];
};

const DEFAULT_VALUES: DBType = { favorites: [], searchHistory: [] };

const DB_PATH = `${__dirname}/db.json`;

@Injectable()
export class DBService {
  async getDB() {
    try {
      await fs.stat(DB_PATH);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'ENOENT'
      ) {
        await fs.writeFile(DB_PATH, JSON.stringify(DEFAULT_VALUES));
      } else {
        throw error;
      }
    }

    const file = await fs.readFile(DB_PATH, 'utf-8');

    return JSON.parse(file) as DBType;
  }

  saveDB(db: Record<string, any>): Promise<void> {
    return fs.writeFile(DB_PATH, JSON.stringify(db));
  }
}

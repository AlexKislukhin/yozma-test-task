import { Get, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { DBService } from 'src/db/db.service';
import { APIResponse } from 'src/type';

const API_URL = 'https://spotify23.p.rapidapi.com';

@Injectable()
export class SearchService {
  constructor(
    private readonly dbService: DBService,
    private configService: ConfigService,
  ) {}

  @Get()
  async findAll({
    query,
    per_page,
    page,
  }: {
    query: string;
    per_page: string;
    page: string;
  }) {
    if (!query) {
      return [];
    }

    const limit = per_page ? parseInt(per_page) : 10;
    const offset = page ? (parseInt(page) - 1) * limit : 0;

    const url = `${API_URL}/search/?q=${query}&type=tracks&limit=${limit}&offset=${offset}`;

    const result = await axios.get<APIResponse>(url, {
      headers: {
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
        'x-rapidapi-key': this.configService.get<string>('RAPIDAPI_KEY'),
      },
    });

    const transformedData = result.data.tracks.items.map((item) => {
      return {
        id: item.data.id,
        name: item.data.name,
        artists: item.data.artists.items.reduce((acc, artist) => {
          return acc + artist.profile.name + ', ';
        }, ''),
        album: {
          cover: item.data.albumOfTrack.coverArt.sources[0].url,
        },
      };
    });

    return transformedData;
  }

  async trackSearch(user: string, query: string) {
    const db = await this.dbService.getDB();

    const date = new Date().toString();

    db.searchHistory.push({
      user,
      query,
      createdAt: date,
      updatedAt: date,
    });

    await this.dbService.saveDB(db);
  }
}

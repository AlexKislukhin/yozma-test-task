import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { UserGuard } from 'src/user/user.guard';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(UserGuard)
  @Get()
  async findAll(
    @Query('q') query: string,
    @Query('per_page') per_page: string,
    @Query('page') page: string,
  ) {
    await this.searchService.trackSearch('user', query);

    return this.searchService.findAll({ query, per_page, page });
  }
}

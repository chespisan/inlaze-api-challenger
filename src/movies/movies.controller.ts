import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}
  @Get()
  async findAll() {
    const movies = await this.movieService.getMovies();
    return movies;
  }
}

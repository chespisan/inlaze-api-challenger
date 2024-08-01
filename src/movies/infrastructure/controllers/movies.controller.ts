import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import {
  GenreEntity,
  PrincipalMoviesEntity,
} from 'src/movies/domain/movie.entity';
import { MovieRepository } from '../../domain/movie.repository';
import { MoviesUseCase } from 'src/movies/application/use-cases/movie.usecase';
import { MoviesService } from '../services/movies.service';

@Controller('movies')
export class MoviesController implements MovieRepository {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly moviesUseCase: MoviesUseCase,
  ) {
    this.moviesUseCase = new MoviesUseCase(this.moviesService);
  }

  @Get()
  async getPrincipalMovies(): Promise<PrincipalMoviesEntity> {
    const movies = await this.moviesUseCase.getPrincipalMovies();
    return movies;
  }

  @Get('/genres')
  async getListGenresMovies(): Promise<GenreEntity> {
    const genres = await this.moviesUseCase.getListGenresMovies();
    return genres;
  }
}

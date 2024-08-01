import {
  GenreEntity,
  PrincipalMoviesEntity,
} from 'src/movies/domain/movie.entity';
import { MovieRepository } from '../../domain/movie.repository';

export class MoviesUseCase implements MovieRepository {
  constructor(private movieRepository: MovieRepository) {}
  async getPrincipalMovies(): Promise<PrincipalMoviesEntity> {
    return this.movieRepository.getPrincipalMovies();
  }

  async getListGenresMovies(): Promise<GenreEntity> {
    return this.movieRepository.getListGenresMovies();
  }
}

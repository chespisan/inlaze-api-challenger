import { GenreEntity, PrincipalMoviesEntity } from './movie.entity';

export interface MovieRepository {
  getPrincipalMovies(): Promise<PrincipalMoviesEntity>;
  getListGenresMovies(): Promise<GenreEntity>;
}

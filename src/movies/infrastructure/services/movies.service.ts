import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, of } from 'rxjs';
import {
  GenreEntity,
  PrincipalMoviesEntity,
} from 'src/movies/domain/movie.entity';
import { MovieRepository } from 'src/movies/domain/movie.repository';

@Injectable()
export class MoviesService implements MovieRepository {
  private urlApiMovies: string;
  public data: any[] = [];

  constructor(private readonly httpService: HttpService) {
    this.urlApiMovies = this.httpService.axiosRef.defaults.baseURL;
  }

  async genericFetchMovie(path: string, key: string) {
    const movies: any = await firstValueFrom(
      this.httpService.get<any[]>(`${this.urlApiMovies}${path}`).pipe(
        catchError((error) => {
          console.error(`Error fetching ${path} movies:`, error);
          return of([]);
        }),
      ),
    );

    const format = {
      [key]: movies.data,
    };
    return format;
  }

  async getPrincipalMovies(): Promise<PrincipalMoviesEntity> {
    try {
      const requests = [
        this.genericFetchMovie('/movie/popular', 'popular'),
        this.genericFetchMovie('/movie/now_playing', 'now_playing'),
        this.genericFetchMovie('/movie/upcoming', 'upcoming'),
        this.genericFetchMovie('/movie/top_rated', 'top_rated'),
      ];

      const data = (await Promise.all(requests)).reduce((prev, acc) => {
        return { ...prev, ...acc };
      }, {});

      return data as PrincipalMoviesEntity;
    } catch (error) {
      console.error('Error fetching principal movies:', error);
      return;
    }
  }

  async getListGenresMovies(): Promise<GenreEntity> {
    try {
      const genres = await this.genericFetchMovie('/genre/movie/list', 'data');
      const format = genres.data.genres.map((genre) => {
        return {
          label: genre.name,
          value: genre.id.toString(),
        };
      });
      return format as GenreEntity;
    } catch (error) {
      console.error('Error fetching Genres movies:', error);
      return;
    }
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async getMovies() {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.httpService.axiosRef.defaults.baseURL}/movie/now_playing`)
        .pipe(
          catchError(() => {
            throw new Error('Failed to fetch movies');
          }),
        ),
    );
    return data;
  }
}

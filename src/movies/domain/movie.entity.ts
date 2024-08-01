export interface IGenericResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGenericDates {
  maximum: string;
  minimum: string;
}

export interface PopularEntity {
  page: number;
  results: IGenericResult[];
  total_pages: number;
  total_results: number;
}

export interface NowPlayingEntity {
  dates: IGenericDates;
  page: number;
  results: IGenericResult[];
  total_pages: number;
  total_results: number;
}

export interface UpcomingEntity {
  dates: IGenericDates;
  page: number;
  results: IGenericResult[];
  total_pages: number;
  total_results: number;
}

export interface TopRatedEntity {
  page: number;
  results: IGenericResult[];
  total_pages: number;
  total_results: number;
}

export interface PrincipalMoviesEntity {
  popular: PopularEntity;
  now_playing: NowPlayingEntity;
  upcoming: UpcomingEntity;
  top_rated: TopRatedEntity;
}

export interface Genre {
  value: string;
  label: string;
}

export interface GenreEntity {
  genres: Genre[];
}

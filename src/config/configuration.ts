import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    movieApi: {
      url: process.env.URL_API_TMDB,
      token: process.env.TOKEN_API_TMDB,
    },
  };
});

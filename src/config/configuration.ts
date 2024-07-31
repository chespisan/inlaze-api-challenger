import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    movieApi: {
      url: process.env.URL_API_TMDB,
      token: process.env.TOKEN_API_TMDB,
    },
    db: {
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      connect: process.env.DB_CONNECT,
    },
    auth: {
      secret: process.env.TOKEN_SECRET,
    },
  };
});

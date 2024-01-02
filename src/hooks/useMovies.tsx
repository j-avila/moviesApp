import { useEffect, useState } from 'react';
import { moviesDB } from '../api/movieDB';
import { Movie, MovieDBResponse } from '../interfaces/MoviesDB';

interface Movies {
  nowPlaying: Movie[];
  popular: Movie[];
  upcoming: Movie[];
  topRated?: Movie[];
}

export const useMovies = () => {
  const [movies, setMovies] = useState<Movies>();
  const [isLoading, setLOading] = useState(true);

  const getMovies = async () => {
    const nowPlaying = moviesDB.get<MovieDBResponse>('/now_playing');
    const popular = moviesDB.get<MovieDBResponse>('/popular');
    const topRated = moviesDB.get<MovieDBResponse>('/top_rated');
    const upcoming = moviesDB.get<MovieDBResponse>('/upcoming');

    const resp = await Promise.all([nowPlaying, popular, topRated, upcoming]);

    setMovies({
      nowPlaying: resp[0].data.results,
      popular: resp[1].data.results,
      topRated: resp[2].data.results,
      upcoming: resp[3].data.results,
    });

    setLOading(false);
  };
  useEffect(() => {
    // now_playing
    getMovies();
  }, []);

  return {
    ...movies,
    isLoading,
  };
};

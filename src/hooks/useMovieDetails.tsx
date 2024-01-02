import { useEffect, useState } from 'react';
import { moviesDB } from '../api/movieDB';
// types
import { MovieDetailsResp } from '../interfaces/MovieDetails';
import { MovieCredits } from '../interfaces/MovieCredits';
import { Suggestions } from '../interfaces/Suggestions';
import { WatchServicesResp } from '../interfaces/WatchServices';

export interface MovieData {
  details: MovieDetailsResp;
  credits: MovieCredits;
  suggestions?: Suggestions;
  watchServices?: WatchServicesResp;
}

export const useMovieDetails = (id: number) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<MovieData>();

  const movieDetails = moviesDB.get<MovieDetailsResp>(`/${id}?language=en-US`);
  const movieCredits = moviesDB.get<MovieCredits>(
    `/${id}/credits?language=en-US`,
  );
  const movieSuggestions = moviesDB.get<Suggestions>(`/${id}/recommendations`);
  const StreaimngServices = moviesDB.get<WatchServicesResp>(
    `/${id}/watch/providers`,
  );

  const getMovieDetails = async () => {
    const details = movieDetails;
    const credits = movieCredits;
    const recomendations = movieSuggestions;
    const watchServices = StreaimngServices;

    const resp = await Promise.all([
      details,
      credits,
      recomendations,
      watchServices,
    ]);

    setDetails({
      details: resp[0].data,
      credits: resp[1].data,
      suggestions: resp[2].data,
      watchServices: resp[3].data,
    });
    setLoading(false);
  };

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  return {
    ...details,
    isLoading,
  };
};

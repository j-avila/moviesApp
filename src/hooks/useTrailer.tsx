import { useState, useEffect } from 'react';
import { Result, Trailer } from '../interfaces/Trailer';
import { moviesDB } from '../api/movieDB';

type Props = {
  id: string;
};

export const useTrailer = ({ id }: Props) => {
  const [trailer, setTrailer] = useState<Result>();
  const trailerResp = moviesDB.get<Trailer>(`/${id}/videos?language=en-US`);

  const getTrailer = async () => {
    const resp = await trailerResp;
    setTrailer(resp.data.results[0]);
  };

  useEffect(() => {
    getTrailer();
  }, []);

  return {
    trailer,
  };
};

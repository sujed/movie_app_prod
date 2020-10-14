import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import PartialMovieData from '../components/PartialMovieData';
import ServerError from '../components/ServerError';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorDetails, setErrorDetails] = useState({ text: '', errorCode: 0 });
  const [moviesLoaded, setMoviesLoaded] = useState(false);

  const getMovies = useCallback(async () => {
    setShowError(false);
    setMoviesLoaded(false);
    try {
      const { data } = await axios.get('/api/v1/movies');
      setMovies(data.movies);
      setMoviesLoaded(true);
    } catch (error) {
      errorDetailsFormater(error);
      setMoviesLoaded(true);
      setShowError(true);
    }
  }, []);

  useEffect(() => {
    getMovies();
  }, []);

  function errorDetailsFormater(errObj) {
    const { response } = errObj;
    if (!response) return;
    if (response.status === 500) {
      setErrorDetails({
        text: 'Internal server error.',
        errorCode: response.status,
      });
    }
    if (response.status === 429) {
      setErrorDetails({
        text: 'Too many requests. Wait 3 minutes.',
        errorCode: response.status,
      });
    }
  }

  return (
    <div>
      <h3>Movies</h3>
      <hr />
      {moviesLoaded === false && !showError && <LoadingSpinner />}

      {moviesLoaded === true && (
        <div className="movie-item-list">
          {movies &&
            movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <PartialMovieData movie={movie} />
              </div>
            ))}
        </div>
      )}
      {moviesLoaded === true && movies && movies.length === 0 && !showError && (
        <h3 className="text-center mt-5">No movies.</h3>
      )}

      {showError && (
        <ServerError handleClick={getMovies} errorDetails={errorDetails} />
      )}
    </div>
  );
};

export default HomeScreen;

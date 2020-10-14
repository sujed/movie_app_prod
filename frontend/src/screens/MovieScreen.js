import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams, Link } from 'react-router-dom';
import Movie from '../components/Movie';
import ServerError from '../components/ServerError';

const MovieScreen = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [errorDetails, setErrorDetails] = useState('');
  const [showError, setShowError] = useState(false);
  const [movieLoaded, setMovieLoaded] = useState(false);

  const getMovie = useCallback(async () => {
    setShowError(false);
    try {
      const { data } = await axios.get(`/api/v1/movies/${id}`);
      setMovieLoaded(true);
      setMovie(data.movie);
    } catch (error) {
      errorDetailsFormater(error);
      setShowError(true);
    }
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

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
    if (response.status === 404) {
      setErrorDetails({
        text: 'Resource not fonud.',
        errorCode: response.status,
      });
    }
  }

  return (
    <div>
      <h3>Movie details</h3>
      <hr />
      <Link to="/">
        <button className="btn btn-primary btn-sm">
          <i className="far fa-arrow-alt-circle-left"></i> Back
        </button>
      </Link>
      {movieLoaded === false && !showError && <LoadingSpinner />}
      {movie && movieLoaded === true && !showError && <Movie movie={movie} />}
      {movieLoaded === false && showError && (
        <ServerError handleClick={getMovie} errorDetails={errorDetails} />
      )}
    </div>
  );
};

export default MovieScreen;

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ModalDelete from './ModalDelete';
import Rating from './Rating';

const Movie = ({ movie }) => {
  const ref = useRef();
  const openModal = () => {
    ref.current.openModal();
  };
  return (
    <>
      <h1 className="mt-4">{movie.name}</h1>
      <Rating stars={movie.rating} />
      <h4 className="mt-3">GENRE: {movie.genre}</h4>
      <hr />
      <p>{movie.plot}</p>
      <hr />
      <p>
        {movie.explicit === false && (
          <span className="text-success">
            <i className="fas fa-check"></i> This movie doesn't contain explicit
            content.
          </span>
        )}
        {movie.explicit === true && (
          <span className="text-danger">
            <i className="fas fa-exclamation"></i> This movie contains explicit
            content.
          </span>
        )}
      </p>
      <div className="movie-controls mt-4">
        <Link to={`/movies/${movie.id}/edit`}>
          <button className="btn btn-primary btn-sm">
            <i className="far fa-edit"></i> Edit
          </button>
        </Link>
        <button onClick={openModal} className="btn btn-danger btn-sm">
          <i className="fa fa-trash"></i> Delete
        </button>
        <ModalDelete ref={ref} movieId={movie.id} />
      </div>
    </>
  );
};

export default Movie;

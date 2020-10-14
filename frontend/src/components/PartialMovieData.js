import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const PartialMovieData = ({ movie }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
        <Rating stars={movie.rating} />
        <hr />
        <Card.Text>Genre: {movie.genre}</Card.Text>
        <Link to={`/movies/${movie.id}`}>
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-info-circle"></i> Details
          </button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PartialMovieData;

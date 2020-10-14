import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useParams, Redirect, Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import ServerError from '../components/ServerError';

const EditMovieScren = () => {
  const alert = useAlert();
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  const [movie, setMovie] = useState({
    name: '',
    genre: 'Action',
    rating: 1,
    explicit: false,
    plot: '',
    id: '',
  });

  useEffect(() => {
    getMovie(id);
  }, [id]);

  async function getMovie(id) {
    setShowError(false);
    setShowLoader(true);
    try {
      const { data } = await axios.get(`/api/v1/movies/${id}`);
      const { movie } = data;
      setMovie(movie);
      setShowLoader(false);
    } catch (error) {
      if (!error) return;
      if (error.response.status === 500) {
        setErrorDetails({ text: error.response.statusText, errorCode: 500 });
      } else if (error.response.status === 429) {
        setErrorDetails({ text: error.response.statusText, errorCode: 429 });
      }
      setShowError(true);
    }
  }

  function handleNameChange(event) {
    setMovie({ ...movie, name: event.target.value });
  }
  function handleGenreChange(event) {
    setMovie({ ...movie, genre: event.target.value });
  }
  function handleRatingChange(event) {
    let rating = event.target.value;
    if (rating > 10 || rating < 1) {
      alert.show('Rating must be from 1 - 10', { type: 'error' });
      return;
    }
    setMovie({ ...movie, rating });
  }
  function handleExplicitChange(event) {
    const value = event.target.value === 'true' ? true : false;

    setMovie({ ...movie, explicit: value });
  }
  function handlePlotChange(event) {
    setMovie({ ...movie, plot: event.target.value.trim() });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isValidmovie()) {
      setShowLoader(true);
      try {
        const { data } = await axios.put(`/api/v1/movies/${id}`, movie);
        if (data.success) {
          setShowLoader(false);
          alert.show('Movie updated!', { type: 'success' });
          setRedirect(true);
          return;
        }
      } catch (error) {
        const { data } = error.response;
        if (data.error) {
          alert.show(data.error, { type: 'error' });
        } else if (error.response.status === 500) {
          alert.show('Something went wrong while proccesing your request.', {
            type: 'error',
          });
        }
        setShowLoader(false);
        return;
      }
    }
    alert.show('Please fill out all fields.', {
      type: 'error',
    });
  }

  function renderRedirect() {
    if (redirect) {
      return <Redirect to={`/movies/${id}`} />;
    }
  }

  function isValidmovie() {
    if (movie.name.trim().length === 0) return false;
    if (movie.genre.trim().length === 0) return false;
    if (movie.rating < 1 || movie.rating > 10) return false;
    if (movie.plot.trim().length === 0) return false;
    return true;
  }

  return (
    <div>
      {renderRedirect()}
      <h3>Edit movie</h3>
      <hr />
      {showLoader && !showError && <LoadingSpinner />}
      {!showError && !showLoader && movie && (
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={movie.name}
              onChange={handleNameChange}
              placeholder="Enter name"
            />
          </Form.Group>
          {/* Genre */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              as="select"
              value={movie.genre}
              onChange={handleGenreChange}
              placeholder="Enter genre"
            >
              <option value="Action">Action</option>
              <option value="Commedy">Commedy</option>
              <option value="Crime">Crime</option>
              <option value="Drama">Drama</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Paranormal">Paranormal</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Thriller">Thriller</option>
            </Form.Control>
          </Form.Group>
          {/* Rating */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              max="10"
              min="1"
              value={movie.rating}
              onChange={handleRatingChange}
              placeholder="Enter rating"
            />
          </Form.Group>
          {/* Explicit content */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Explicit</Form.Label>
            <br />
            <Form.Check
              type="radio"
              inline
              name="isExplicit"
              onChange={handleExplicitChange}
              checked={movie.explicit === true}
              value="true"
              id={`yes`}
              label="Yes"
            />
            <Form.Check
              type="radio"
              inline
              name="isExplicit"
              onChange={handleExplicitChange}
              checked={movie.explicit === false}
              value="false"
              id={`no`}
              label="No"
            />
          </Form.Group>
          {/* Plot  */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Plot</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={movie.plot}
              onChange={handlePlotChange}
            />
          </Form.Group>

          <button className="btn btn-primary btn-sm" type="submit">
            Submit
          </button>
          <Link to={`/movies/${id}`}>
            <button className="btn btn-warning btn-sm ml-2">Cancel</button>
          </Link>
        </Form>
      )}
      {showError && (
        <ServerError
          handleClick={getMovie.bind(this, id)}
          errorDetails={errorDetails}
        />
      )}
    </div>
  );
};

export default EditMovieScren;

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { useAlert } from 'react-alert';

const NewMovieScreen = () => {
  const alert = useAlert();
  const [movieId, setMovieId] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [newMovie, setNewMovie] = useState({
    name: '',
    genre: 'Action',
    rating: 1,
    explicit: false,
    plot: '',
  });

  function handleNameChange(event) {
    setNewMovie({ ...newMovie, name: event.target.value });
  }
  function handleGenreChange(event) {
    setNewMovie({ ...newMovie, genre: event.target.value });
  }
  function handleRatingChange(event) {
    let rating = event.target.value;
    if (rating > 10 || rating < 1) {
      alert.show('Rating must be from 1 - 10', { type: 'error' });
      return;
    }
    setNewMovie({ ...newMovie, rating });
  }
  function handleExplicitChange(event) {
    const value = event.target.value === 'true' ? true : false;

    setNewMovie({ ...newMovie, explicit: value });
  }
  function handlePlotChange(event) {
    setNewMovie({ ...newMovie, plot: event.target.value.trim() });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isValidNewMovie()) {
      setShowLoader(true);
      try {
        const { data } = await axios.post('/api/v1/movies', newMovie);
        if (data.success) {
          setShowLoader(false);
          setMovieId(data.movie[0].id);
          setNewMovie({
            name: '',
            genre: 'Action',
            rating: 1,
            explicit: false,
            plot: '',
          });
          alert.show('Movie added!', { type: 'success' });
          setRedirect(true);
          return;
        }
      } catch (error) {
        const { data } = error.response;
        if (data.error) {
          alert.show(data.error, { type: 'error' });
        }
        if (error.response.status === 500) {
          alert.show(error.response.statusText, { type: 'error' });
        }
        setShowLoader(false);
        return;
      }
    }
    alert.show('Please fill out all fields.', { type: 'error' });
  }

  function isValidNewMovie() {
    if (newMovie.name.trim().length === 0) return false;
    if (newMovie.genre.trim().length === 0) return false;
    if (newMovie.rating < 1 || newMovie.rating > 10) return false;
    if (newMovie.plot.trim().length === 0) return false;
    return true;
  }

  function renderRedirect() {
    if (redirect) {
      return <Redirect to={`/movies/${movieId}`} />;
    }
  }

  return (
    <div>
      {renderRedirect()}
      <h3>Add movie</h3>
      <hr />
      {showLoader && <LoadingSpinner />}
      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newMovie.name}
            onChange={handleNameChange}
            placeholder="Enter name"
          />
        </Form.Group>
        {/* Genre */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            as="select"
            value={newMovie.genre}
            onChange={handleGenreChange}
            placeholder="Enter genre"
          >
            <option value="Action">Action</option>
            <option value="Commedy">Commedy</option>
            <option value="Crime">Crime</option>
            <option value="Drama">Drama</option>
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
            value={newMovie.rating}
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
            checked={newMovie.explicit === true}
            value="true"
            id={`yes`}
            label="Yes"
          />
          <Form.Check
            type="radio"
            inline
            name="isExplicit"
            onChange={handleExplicitChange}
            checked={newMovie.explicit === false}
            value="false"
            id={`no`}
            label="No"
          />
        </Form.Group>
        {/* Plot  */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Plot</Form.Label>
          <Form.Control as="textarea" rows="3" onChange={handlePlotChange} />
        </Form.Group>

        <button className="btn btn-primary btn-sm" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default NewMovieScreen;

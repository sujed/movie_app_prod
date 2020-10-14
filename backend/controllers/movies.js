const knex = require('../db/connection');
const ErrorResponse = require('../utils/errorResponse');
const { asyncHandler } = require('../utils/async');

exports.addMovie = asyncHandler(async (req, res, next) => {
  const newMovieData = {
    name: req.body.name.trim(),
    genre: req.body.genre.trim(),
    rating: req.body.rating,
    plot: req.body.plot.trim(),
    explicit: req.body.explicit,
  };

  if (newMovieData.name === '') {
    return next(new ErrorResponse('Name of the movie is required.', 400));
  }

  if (newMovieData.rating > 10 || newMovieData.rating < 1) {
    return next(new ErrorResponse('Rating must be from 1 to 10.', 400));
  }

  const newMovieId = await knex('movies').insert(newMovieData);
  const movie = await knex.select().from('movies').where('id', newMovieId);
  res.json({ success: true, movie });
});

exports.updateMovie = asyncHandler(async (req, res, next) => {
  const updateMovieData = {
    name: req.body.name.trim(),
    genre: req.body.genre.trim(),
    rating: req.body.rating,
    plot: req.body.plot.trim(),
    explicit: req.body.explicit,
  };

  if (newMovieData.name === '') {
    return next(new ErrorResponse('Name of the movie is required.', 400));
  }

  if (updateMovieData.rating > 10 || updateMovieData.rating < 1) {
    return next(new ErrorResponse('Rating must be from 1 to 10.', 400));
  }
  const newMovieId = await knex('movies')
    .where('id', req.params.id)
    .update(updateMovieData);
  const movie = await knex.select().from('movies').where('id', req.params.id);
  res.json({ success: true, movie });
});

exports.getAllMovies = asyncHandler(async (req, res, next) => {
  const movies = await knex.select().from('movies');
  res.json({ succes: true, movies });
});

exports.getOneMovie = asyncHandler(async (req, res, next) => {
  const movieId = req.params.id;
  const movies = await knex.select().from('movies').where('id', movieId);
  if (movies.length === 0) {
    return res.status(404).json({ success: true, message: 'No movies found.' });
  }
  movies[0].explicit = movies[0].explicit === 0 ? false : true;
  res.json({ success: true, movie: movies[0] });
});

exports.deleteOneMovie = asyncHandler(async (req, res, next) => {
  const movieId = req.params.id;
  const movies = await knex('movies').where('id', movieId).del();
  res.json({ success: true, movie: movies });
});

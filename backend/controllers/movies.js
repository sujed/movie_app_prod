const knex = require('../db/connection');
const { asyncHandler } = require('../utils/async');

exports.addMovie = asyncHandler(async (req, res, next) => {
  const newMovieData = {
    name: req.body.name.trim(),
    genre: req.body.genre.trim(),
    rating: req.body.rating,
    plot: req.body.plot.trim(),
    explicit: req.body.explicit,
  };
  const newMovieId = await knex('movies').insert(newMovieData);
  const movie = await knex.select().from('movies').where('id', newMovieId);
  console.log(movie);
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

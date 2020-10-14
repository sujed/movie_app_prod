const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  getOneMovie,
  addMovie,
  updateMovie,
  deleteOneMovie,
} = require('../controllers/movies');

/* GET home page. */
router.get('/', getAllMovies);

/* GET specific moive */
router.get('/:id', getOneMovie);

/* POST add movie */
router.post('/', addMovie);

/* PUT specific moive */
router.put('/:id', updateMovie);

/* DELETE specific moive */
router.delete('/:id', deleteOneMovie);

module.exports = router;

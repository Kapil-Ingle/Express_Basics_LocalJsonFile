const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();

// PARAM MIDDLEWARE
router.param('id', moviesController.checkId)

// ROUTE CHAINING FOR SAME ENDPOINTS
router.route('/')
.get(moviesController.getAllMovies)
.post(moviesController.validateBody, moviesController.addMovie);

router.route('/:id')
.get(moviesController.getMovieById)
.patch(moviesController.updateMovie)
.delete(moviesController.deleteMovie);

module.exports = router;

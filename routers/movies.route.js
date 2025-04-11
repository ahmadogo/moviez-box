const express = require("express");
const router = express.Router()
const {
  getMoviez,
  postMoviez,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controllers.js");

router.route("/")
  .get(getMoviez)
  .post(postMoviez);

router.route("/:id")
  .get(getMovieById)
  .patch(updateMovie)
  .delete(deleteMovie);


  module.exports = router
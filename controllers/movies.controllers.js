const express = require("express");
const fs = require("fs");

const moviez = JSON.parse(fs.readFileSync("./data/moviez.json", "utf-8"));
let app = express()
app.use(express.json());

//GET all moviez
const getMoviez = (req, res) => {
  res.status(200).json({
    status: "success",
    total: moviez.length,
    data: {
      moviez,
    },
  });
};

//GET movie/:id
const getMovieById = (req, res) => {
  //convert req to number
  let newId = +req.params.id;
  //find the movie
  const movie = moviez.find((el) => el.id === newId);

  if (!movie) {
    return res.status(404).json({
      status: "failed",
      message: `movie with ${id} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
};

// POST movie
const postMoviez = (req, res) => {
  const exists = moviez.some((m) => m.name === req.body.name);

  if (exists) {
    return res.status(400).json({
      status: "failed",
      message: "movie already exists",
    });
  }

  const newId = moviez[moviez.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  moviez.push(newMovie);

  fs.writeFile("./data/moviez.json", JSON.stringify(moviez), (err) => {
    res.status(201).json({
      status: "success",
      data: { newMovie },
    });
  });
};

// PATCH movie
const updateMovie = (req, res) => {
  //convert req to number
  let newId = +req.params.id;
  //find the movie to update
  let movieToUpdate = moviez.find((el) => el.id === newId);
  //find the movie index
  let index = moviez.indexOf(movieToUpdate);
  //merge the updates to the existing movie
  Object.assign(movieToUpdate, req.body);
  moviez[index] = movieToUpdate;

  //write new update to the DB
  fs.writeFile("./data/moviez.json", JSON.stringify(moviez), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

//DELETE movie
const deleteMovie = (req, res) => {
  //convert req body to number
  let newId = +req.params.id;
  //find the movie to delete
  let movieToDelete = moviez.find((el) => el.id === newId);
  //find the index of the movie
  let index = moviez.indexOf(movieToDelete);

  moviez.splice(index, 1);

  fs.writeFile("./data/moviez.json", JSON.stringify(moviez), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};

module.exports = {
  getMoviez,
  postMoviez,
  updateMovie,
  deleteMovie,
  getMovieById,
};

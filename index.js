const express = require("express");
const router = require("./routers/movies.route");

const app = express();

app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Moviez box to the world 🥳");
});

// Register movie routes
app.use("/api/v2/moviez", router);

module.exports = app; 
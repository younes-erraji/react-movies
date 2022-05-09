const express = require("express"),
  app = express(),
  cors = require('cors'),
  bodyParser = require("body-parser"),
  mysql = require("mysql"),
  DB = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_movies",
  });

// app.get("/api/insert", (request, response) => {
//   const now = Date.now();
//   const sql = `Insert Into TMovies(Movie_name, Movie_desc, Movie_rate, Movie_views, Inserted_at) values('First Movie', 'First Movie Description', 8, 0, ${now})`;
//   DB.query(sql, (error, result) => {});
//   response.send("Hello World!");
// });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (request, response) => {
  const movie = request.body.movie,
    movieDesc = request.body.movieDesc,
    movieRate = request.body.movieRate,
    now = Date.now(),
    sql = `Insert Into TMovies(Movie_name, Movie_desc, Movie_rate, Movie_views, Inserted_at) values('${movie}', '${movieDesc}', ${movieRate}, 0, '${now}')`;
  DB.query(sql, (error, result) => {
    console.log(result);
  });
});

app.get("/api/get", (request, response) => {
  const sql = `SELECT Movie_name, Movie_desc, Movie_rate, Movie_views, Inserted_at FROM TMovies`;
  DB.query(sql, (error, result) => {
    response.send(result);
  });
});

app.listen(3001, () => console.warn("running on port 3001 ..."));

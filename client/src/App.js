import { useState, useEffect } from "react";
import Axios from "axios";

import "./style/bootstrap.min.css";

const App = () => {
  const [movies, setMovies] = useState([]);

  const [movie, setMovie] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [movieRate, setMovieRate] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get")
      // .then((response) => response.json())
      .then((response) => console.log(response));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/insert", {
      movie,
      movieDesc,
      movieRate,
    }).then(() => console.log("successfully inserted"));
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="col-12 text-center">CRUD Application</h1>
        <hr className="col-12" />
        <form className="col-12" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="movie-name">Movie</label>
            <input
              type="text"
              id="movie-name"
              className="form-control"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
            />
            {/*
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            */}
          </div>
          <div className="form-group">
            <label htmlFor="movie-desc">Movie Description</label>
            <input
              type="text"
              id="movie-desc"
              className="form-control"
              value={movieDesc}
              onChange={(e) => setMovieDesc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="movie-rate">Rate</label>
            <input
              type="number"
              id="movie-rate"
              className="form-control"
              value={movieRate}
              onChange={(e) => setMovieRate(e.target.value)}
            />
          </div>
          {/*
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Is out
            </label>
          </div>
          */}

          <div className="text-center my-2">
            <strong>{movie}</strong>
            <br />
            <strong>{movieDesc}</strong>
            <br />
            <strong>{movieRate}</strong>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;

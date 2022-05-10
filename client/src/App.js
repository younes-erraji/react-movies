import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Movie from "./components/cards/Movie";

import "./style/bootstrap.min.css";

const App = () => {
  const [movies, setMovies] = useState([]);

  const [movie, setMovie] = useState(""),
    [movieDesc, setMovieDesc] = useState(""),
    [movieRate, setMovieRate] = useState(0);

  const movieNameRef = useRef(),
    movieNameErrorRef = useRef(),
    movieDescRef = useRef(),
    movieDescErrorRef = useRef();

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovies(
        response.data.map((movie) => {
          return (
            <Movie
              key={movie.ID}
              movie={{ title: movie.Movie_name, description: movie.Movie_desc }}
            />
          );
        })
      );
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;
    if (movieNameRef.current.value == "") {
      movieNameErrorRef.current.textContent =
        "The Movie Name Field Is Required!";
      error = true;
    } else {
      movieNameErrorRef.current.textContent = "";
      error = false;
    }

    if (movieDescRef.current.value == "") {
      movieDescErrorRef.current.textContent =
        "The Movie Description Field Is Required!";
      error = true;
    } else {
      movieDescErrorRef.current.textContent = "";
      error = error ? true : false;
    }

    if (error === true) {
      return;
    } else {
      Axios.post("http://localhost:3001/api/insert", {
        movie,
        movieDesc,
        movieRate,
      })
        .then(() => {
          console.log("successfully inserted");
          setMovies([...movies, { title: movie, description: movieDesc }]);
        })
        .catch(() => {
          console.error("something went wrong!");
        });
    }
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
              ref={movieNameRef}
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
            />
            <small
              ref={movieNameErrorRef}
              className="form-text text-danger"
            ></small>
          </div>
          <div className="form-group">
            <label htmlFor="movie-desc">Movie Description</label>
            <input
              type="text"
              id="movie-desc"
              className="form-control"
              ref={movieDescRef}
              value={movieDesc}
              onChange={(e) => setMovieDesc(e.target.value)}
            />
            <small
              ref={movieDescErrorRef}
              className="form-text text-danger"
            ></small>
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
      <hr />
      <div className="row">{movies}</div>
    </div>
  );
};

export default App;

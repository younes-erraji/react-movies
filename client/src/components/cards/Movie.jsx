import Placeholder from "../../images/placeholder.png";

const Movie = ({ movie: { title, description } }) => {
  return (
    <div className="col-3 card my-2">
      <img src={Placeholder} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">
          Show more
        </a>
      </div>
    </div>
  );
};

export default Movie;

import Card from "react-bootstrap/Card"
import Movie from "./Movie"
import "./MovieList.css"

const MovieList = (props) => {
    return (
      <div className="movie-list">
     
        {props.items.map((movie) => (
          <Movie isAdmin={props.isAdmin} showing={props.showing}
          key={movie._id}
          title={movie.movieTitle}
          pieces={movie.director}
          img={movie.trailerPictureURL}
          trailer={movie.trailerVideoURL}
          />
        ))} 
     
      </div>
    );
  }

  export default MovieList;
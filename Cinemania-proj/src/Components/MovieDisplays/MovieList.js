import Card from "react-bootstrap/Card"
import Movie from "./Movie"
import "./MovieList.css"

const MovieList = (props) => {
    return (
      <Card className="MovieList">
        {props.items.map((movie) => (
          <Movie isAdmin={props.isAdmin}
          key = {movie.id}
          title = {movie.title}
          pieces = {movie.director}
          img = {movie.img}
          trailer = {movie.trailer}
          />
        ))} 
      </Card>
    );
  }

  export default MovieList;
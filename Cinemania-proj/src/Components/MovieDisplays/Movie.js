import Card from "react-bootstrap/Card";
const Movie = (props) => {
    const clickHandler = () => {

    }
    return (
        <Card className='Movie'>
          <img src={props.img} className="movie-img" alt={props.title} />
          <div className='Movie__description'>
            <h2>{props.title}</h2>
            {/* <div className='Director'>{props.director}</div> */}
          </div>
          <button onClick={clickHandler}>Details</button>
          <button onClick={clickHandler}>Book Tickets</button>
          <button onClick={clickHandler}>View Trailer</button>
        </Card>
      );
}

export default Movie;
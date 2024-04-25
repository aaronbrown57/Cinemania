import NavMenu from '../Navigation/NavMenu';
import MovieDisplay from '../MovieDisplays/MovieDisplay';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router-dom';
const AuthView = (loggedIn) => {
  const { userId } = useParams();
       
  return (
    <div className="App">
        <NavMenu loggedIn={true} admin={false}></NavMenu>
        <h1>Welcome back {userId}!</h1>
        <Container>
          <MovieDisplay></MovieDisplay>
        </Container>
    </div>
  );
    
}
export default AuthView;
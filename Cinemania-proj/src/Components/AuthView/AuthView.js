import NavMenu from '../Navigation/NavMenu';
import MovieDisplay from '../MovieDisplays/MovieDisplay';
import Container from 'react-bootstrap/esm/Container';
const AuthView = (loggedIn) => {

       
  return (
    <div className="App">
        <NavMenu loggedIn={true} admin={false}></NavMenu>
        <h1>Welcome back Username!</h1>
        <Container>
          <MovieDisplay></MovieDisplay>
        </Container>
    </div>
  );
    
}
export default AuthView;
import Body from './components/layout/body/Body'
import { styled } from '@mui/material/styles';
import Home from './components/pages/home/Home';
import SignUp from './components/pages/SignUp/SignUp';
import Login from './components/pages/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Body loggedIn={false}>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/EjKBA/signUp" component={SignUp}/>
          <Route exact path="/EjKBA/login" component={Login}/>

        </Switch>
        </Body>
      </Router>
  );
}

export default App;

import Body from './components/layout/body/Body'
import { styled } from '@mui/material/styles';
import Home from './components/pages/home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Body loggedIn={true}>
      <Router>
        <Switch>
          <Route path="/" component={Home} />

        </Switch>
      </Router>
    </Body>
  );
}

export default App;

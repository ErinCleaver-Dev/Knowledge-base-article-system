import Body from './components/layout/body/Body'
import { styled } from '@mui/material/styles';
import Home from './components/pages/home/Home'
import Category from './components/pages/catagory/Category'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Body loggedIn={true}>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category?q=" component={Category} />
        </Switch>
        </Body>
      </Router>
  );
}

export default App;

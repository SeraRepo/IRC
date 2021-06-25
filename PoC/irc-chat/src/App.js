import './App.css';
import Home from './components/Home';
import Chat from './components/Chat';
import {
  BrowserRouter as Router,
  Route, Switch,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/chat">
            <Chat/>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

import React, { Component } from 'react';
import Startpage from './pages/Startpage';
import Storypage from './pages/Storypage';
import Decisionpage from './pages/Decisionpage';
import Jailpage from './pages/Jailpage';
import {Route, Router} from 'react-router-dom';
import './App.scss';
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
          <Route exact path="/" component={() => <Startpage/>}/>
          <Route exact path="/story" component={() => <Storypage/>}/>
          <Route exact path="/decision" component={() => <Decisionpage/>}/>
          <Route exact path="/jail" component={() => <Jailpage/>}/>
      </Router>
    );
  }
}

export default App;

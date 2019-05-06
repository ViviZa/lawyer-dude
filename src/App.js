import React, { Component } from 'react';
import Startpage from './pages/Startpage';
import Storypage from './pages/Storypage';
import Decisionpage from './pages/Decisionpage';
import Jailpage from './pages/Jailpage';
import {Route, Router} from 'react-router-dom';
import './App.scss';
import { createBrowserHistory } from "history";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const history = createBrowserHistory()
library.add(faBars);

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

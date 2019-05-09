import React, { Component } from 'react';
import Storypage from './pages/Story/Storypage';
import StartPage from './pages/Startpage/Startpage';
import Decisionpage from './pages/Decision/Decisionpage';
import Jailpage from './pages/Jailpage';
import {Route, Router} from 'react-router-dom';
import './App.scss';
import { createBrowserHistory } from "history";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import LearningGoals from './pages/LearningGoals/LearningGoals.jsx';
import EnterName from './pages/EnterName/EnterName.jsx';

const history = createBrowserHistory()
library.add(faBars);

class App extends Component {
  render() {
    return (
      <Router history={history}>
          <Route exact path="/" component={() => <StartPage/>}/>
          <Route exact path="/learninggoals" component={() => <LearningGoals/>}/>
          <Route exact path="/entername" component={() => <EnterName/>}/>
          <Route exact path="/story" component={() => <Storypage/>}/>
          <Route exact path="/decision" component={() => <Decisionpage/>}/>
          <Route exact path="/jail" component={() => <Jailpage/>}/>
      </Router>
    );
  }
}

export default App;

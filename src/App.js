import React, { Component } from 'react';
import Storypage from './pages/Story/Storypage';
import StartPage from './pages/Startpage';
import Decisionpage from './pages/Decision/Decisionpage';
import Jailpage from './pages/Jailpage';
import {Route, Router} from 'react-router-dom';
import './App.scss';
import { createBrowserHistory } from "history";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import NoDesicion from './pages/TemplateNoDesicion';
import EnterName from './pages/EnterName.jsx';
import TemplateDecision from './pages/TemplateDecision';

const history = createBrowserHistory()
library.add(faBars);

class App extends Component {
  render() {
    return (
      <Router history={history}>
          <Route exact path="/" component={() => <StartPage/>}/>
          <Route exact path="/learninggoals" component={() => <NoDesicion/>}/>
          <Route exact path="/entername" component={() => <EnterName/>}/>
          <Route exact path="/introduction" component={() => <TemplateDecision/>}/>
          <Route exact path="/picturesfrominternet" component={() => <TemplateDecision/>}/>
          <Route exact path="/searchingonline" component={() => <TemplateDecision/>}/>
          <Route exact path="/understandingsource" component={() => <TemplateDecision/>}/>
          <Route exact path="/usingfreelicences" component={() => <TemplateDecision/>}/>
          <Route exact path="/findingholder" component={() => <TemplateDecision/>}/>
          <Route exact path="/usingwiki" component={() => <TemplateDecision/>}/>
          <Route exact path="/copyrightinfo" component={() => <TemplateDecision/>}/>
          <Route exact path="/gettinglicence" component={() => <NoDesicion/>}/>
          <Route exact path="/usinglicence" component={() => <TemplateDecision/>}/>
          <Route exact path="/creatingnotice" component={() => <TemplateDecision/>}/>
          <Route exact path="/usingpicture" component={() => <TemplateDecision/>}/>
          <Route exact path="/moreinformation" component={() => <TemplateDecision/>}/>
          <Route exact path="/success" component={() => <TemplateDecision/>}/>
          <Route exact path="/finish" component={() => <TemplateDecision/>}/>
          <Route exact path="/story" component={() => <Storypage/>}/>
          <Route exact path="/decision" component={() => <Decisionpage/>}/>
          <Route exact path="/jail" component={() => <Jailpage/>}/>
      </Router>
    );
  }
}

export default App;

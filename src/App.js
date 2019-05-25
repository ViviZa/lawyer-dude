import React, { Component } from 'react';
import StartPage from './pages/Startpage';
import Jailpage from './pages/Jailpage';
import {Route, Router} from 'react-router-dom';
import './App.scss';
import { createBrowserHistory } from "history";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import NoDesicion from './pages/TemplateNoDesicion';
import EnterName from './pages/EnterName.jsx';
import TemplateDecision from './pages/TemplateDecision';
import MatchTheLicense from './games/MatchTheLicense';

const history = createBrowserHistory()
library.add(faBars);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedPages: 1,
    };

    this.addingPages = this.addingPages.bind(this);
  }

  addingPages = (ID) => {
    const visitedPages = localStorage.getItem('visitedPages');
    let visitedPagesParsed = JSON.parse(visitedPages);
    if(visitedPages.indexOf(ID) === -1){
      visitedPagesParsed.push(ID);
    }
    localStorage.setItem('visitedPages', JSON.stringify(visitedPagesParsed));
  }

  render() {
    return (
      <Router history={history}>
          <Route exact path="/" component={() => <StartPage addingPages={this.addingPages}/>}/>
          <Route exact path="/learninggoals" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/entername" component={() => <EnterName addingPages={this.addingPages}/>}/>
          <Route exact path="/introduction" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/picturesfrominternet" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/searchingonline" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/understandingsource" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/usingfreelicences" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/findingholder" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/usingwiki" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/copyrightinfo" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/gettinglicence" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/usinglicence" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/creatingnotice" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/usingpicture" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/moreinformation" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/usingsearchengines" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/usingsearchtool" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/usingwiki2" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/usinggoogle" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/success" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/finish" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/jail" component={() => <Jailpage addingPages={this.addingPages}/>}/>
          <Route exact path="/matchthelicense" component={() => <MatchTheLicense/>}/>
          <Route exact path="/stealingpictures" component={() => <Jailpage addingPages={this.addingPages}/>}/>
          <Route exact path="/stealingpictures1" component={() => <Jailpage addingPages={this.addingPages}/>}/>
          <Route exact path="/stealingpictures2" component={() => <Jailpage addingPages={this.addingPages}/>}/>
          <Route exact path="/stealingpictures3" component={() => <Jailpage addingPages={this.addingPages}/>}/>
          <Route exact path="/stealingpictures4" component={() => <Jailpage addingPages={this.addingPages}/>}/>
          <Route exact path="/missinglicence" component={() => <Jailpage addingPages={this.addingPages}/>}/>
      </Router>
    );
  }
}

export default App;

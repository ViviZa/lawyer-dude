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
import UsingThePicture from './games/UsingThePicture';
import WelcomePage from './pages/WelcomePage';

const history = createBrowserHistory()
library.add(faBars);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedPages: 1,
      textIndex: 0,
    };

    this.addingPages = this.addingPages.bind(this);
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
  }

  addingPages = (ID) => {
    const {textIndex} = this.state;
    if (textIndex > 0) {
      console.log("Setting textindex!")
      this.setState({textIndex: 0});
    }
    const visitedPages = localStorage.getItem('visitedPages');
    let visitedPagesParsed = JSON.parse(visitedPages);
    if(visitedPages.indexOf(ID) === -1){
      visitedPagesParsed.push(ID);
    }
    localStorage.setItem('visitedPages', JSON.stringify(visitedPagesParsed));
  }

  nextText(panels) {
    const { textIndex } = this.state
    const size = panels.length - 1;
    if (textIndex >= 0 && textIndex < size) {
      this.setState(prevState => {
        return {textIndex: prevState.textIndex + 1}
     })
    }
  }

  previousText(panels) {
    const size = panels.length - 1;
    if (this.state.textIndex > 0 && this.state.textIndex <= size) {
      this.setState(prevState => {
        return {textIndex: prevState.textIndex -1 }
     })
    }
  }

  render() {
    const {textIndex} = this.state;
    return (
      <Router history={history}>
          <Route exact path="/" component={() => <StartPage addingPages={this.addingPages}/>}/>
          <Route exact path="/learninggoals" component={() => <WelcomePage addingPages={this.addingPages}/>}/>
          <Route exact path="/entername" component={() => <EnterName addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>} />
          <Route exact path="/introduction" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText} />}/>
          <Route exact path="/picturesfrominternet" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/searchingonline" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/understandingsource" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/usingfreelicences" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/findingholder" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/usingwiki" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/copyrightinfo" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/gettinglicence" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/usinglicence" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/creatingnotice" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/usingpicture" component={() => <UsingThePicture addingPages={this.addingPages}/>}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>
          <Route exact path="/dontusetheimage" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/moreinformation" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/usingsearchengines" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/usingsearchtool" component={() => <NoDesicion addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/usingwiki2" component={() => <NoDesicion addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>} />
          <Route exact path="/usinggoogle" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/success" component={() => <TemplateDecision addingPages={this.addingPages}   textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/finish" component={() => <NoDesicion addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/jail" component={() => <Jailpage addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/matchthelicense" component={() => <MatchTheLicense addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/collectinfo" component={() => <TemplateDecision addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/stealingpictures" component={() => <Jailpage addingPages={this.addingPages}   textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/attributionGenerator1" component={() => <NoDesicion addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
          <Route exact path="/attributionGenerator2" component={() => <NoDesicion addingPages={this.addingPages}  textIndex={textIndex} nextText={this.nextText} previousText={this.previousText}/>}/>
      </Router>
    );
  }
}

export default App;

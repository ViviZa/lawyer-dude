import React, { Component } from 'react';
import Startpage from './pages/Startpage';
import Storypage from './pages/Storypage';
import Decisionpage from './pages/Decisionpage';
import Jailpage from './pages/Jailpage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Startpage/>
        _______________________________________________________________________________________________________________
        <Storypage/>
         _______________________________________________________________________________________________________________
        <Decisionpage/>
         _______________________________________________________________________________________________________________
         <Jailpage/>
      </div>
    );
  }
}

export default App;

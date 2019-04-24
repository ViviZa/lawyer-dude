import React, { Component } from 'react';
import Startpage from './pages/Startpage';
import Storypage from './pages/Storypage';
import './App.css';

class App extends Component {

constructor(props) {
    super(props);
    this.onSetNewPage = this.onSetNewPage.bind(this);
    this.onSetUsername = this.onSetUsername.bind(this);
    this.state = {
    username : "",
    currentPage: <Startpage onSaveUsername={this.onSetUsername} />
    };
  }

  onSetNewPage() {
        this.setState({currentPage: <Storypage/>});
  }

  onSetUsername(uname) {
    this.setState({username: uname});
    this.onSetNewPage();
  }

  render() {
    return (
      <div className="App">
        {this.state.currentPage}
      </div>
    );
  }

  }

export default App;

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
    currentPage: <Startpage onSaveUsername={this.onSetUsername} />,
    username: ''
    };
  }

  onSetNewPage() {
        this.setState({currentPage: <Storypage/>});
  }

  onSetUsername(name) {
    this.setState({username: name});
    alert('A name was submitted: ' + this.state.username);
    this.onSetNewPage();
  }

  render() {
    return (
      <div className="Game">
        {this.state.currentPage}
      </div>
    );
  }

  }

export default App;

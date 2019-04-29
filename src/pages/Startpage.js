import React, { Component } from 'react';
import '../styles/style.css';


class Startpage extends Component {

 constructor(props) {
    super(props);
    this.state = {
    username: '',
    textIndex: 0
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    this.props.setUserName(this.state.username);
    this.props.goToNextPage(this.props.nextPage);
    event.preventDefault();
  }

  nextText() {
    const theSize = this.props.panels.length-1;
    if(this.state.textIndex >= 0 && this.state.textIndex < theSize){
        this.state.textIndex++;
        this.setState({textIndex: this.state.textIndex});
    }
  }

  previousText() {
    const theSize = this.props.panels.length-1;
    if(this.state.textIndex > 0 && this.state.textIndex <= theSize){
        this.state.textIndex--;
        this.setState({textIndex: this.state.textIndex});
    }
  }

  render() {
    return (
      <div className="Startpage">
        <h1>{this.props.headline}</h1>
        <p>{this.props.panels[this.state.textIndex]}</p>
        <button onClick={this.previousText}>go back</button>
        <button onClick={this.nextText}>go forward</button>
        <p></p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your name:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Let's go" />
        </form>
      </div>
    );
  }
}

export default Startpage;

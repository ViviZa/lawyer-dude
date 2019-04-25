import React, { Component } from 'react';
import '../styles/style.css';


class Startpage extends Component {

 constructor(props) {
    super(props);
    this.state = {username: ''};

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

  render() {
    return (
      <div className="Startpage">
        <h1>{this.props.headline}</h1>
        <p>{this.props.text}</p>
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

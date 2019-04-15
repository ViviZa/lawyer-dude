import React, { Component } from 'react';
import '../styles/style.css';


class Startpage extends Component {
  render() {
    return (
      <div className="Startpage">
        <h1>Welcome</h1>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        <label>
            Enter your name:
            <input type="text" name="name" />
          </label>
        <button>Let's go</button>
      </div>
    );
  }
}

export default Startpage;

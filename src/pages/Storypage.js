import React, { Component } from 'react';
import '../styles/style.css';
import defaultImg from './index.png';


class Storypage extends Component {
  render() {
    return (
      <div className="Storypage">
        <h1>Use Case 1</h1>
        <img src={defaultImg} className="defaultImg" alt="logo" />
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        <button>go back</button>
        <button>go forward</button>
      </div>

    );
  }
}

export default Storypage;

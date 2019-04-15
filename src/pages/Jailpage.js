import React, { Component } from 'react';
import '../styles/style.css';
import defaultImg from './index.png';


class Jailpage extends Component {
  render() {
    return (
      <div className="Jailpage">
        <h1>Uh oh!</h1>
        <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        <img src={defaultImg} className="defaultImg" alt="logo" />
      </div>
    );
  }
}

export default Jailpage;

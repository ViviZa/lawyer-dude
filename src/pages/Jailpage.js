import React, { Component } from 'react';
import '../styles/style.css';
import defaultImg from './index.png';


class Jailpage extends Component {
  render() {
    return (
      <div className="Jailpage">
        <h1>{this.props.headline}</h1>
        <p>{this.props.text}</p>
        <img src={defaultImg} className="defaultImg" alt="logo" />
      </div>
    );
  }
}

export default Jailpage;

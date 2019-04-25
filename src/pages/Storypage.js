import React, { Component } from 'react';
import '../styles/style.css';
import defaultImg from './index.png';


class Storypage extends Component {
  render() {
    return (
      <div className="Storypage">
        <h1>{this.props.headline}</h1>
        <div className="info-section">
            <img src={defaultImg} className="defaultImg" alt="logo" />
            <div className="story-text">
            <p>{this.props.text}</p>
            </div>
        </div>
        <button>go back</button>
        <button>go forward</button>
      </div>

    );
  }
}

export default Storypage;

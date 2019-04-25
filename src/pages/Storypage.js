import React, { Component } from 'react';
import '../styles/style.css';
import defaultImg from './index.png';


class Storypage extends Component {

 constructor(props) {
        super(props);
        this.renderNextPage = this.renderNextPage.bind(this);
      }

  renderNextPage(){
    this.props.goToNextPage(this.props.nextPage);
  }

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
        <button onClick={this.renderNextPage}>go forward</button>
      </div>

    );
  }
}

export default Storypage;

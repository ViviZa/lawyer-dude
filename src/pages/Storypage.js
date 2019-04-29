import React, { Component } from 'react';
import '../styles/style.css';
import defaultImg from './index.png';
import { withRouter } from 'react-router';


class Storypage extends Component {
  redirectPage(pageName){
    const {history} = this.props;
    history.push("/" + pageName);
  }

  render() {
    return (
      <div className="Storypage">
        <h1>Use Case 1</h1>
        <div className="info-section">
            <img src={defaultImg} className="defaultImg" alt="logo" />
            <div className="story-text">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
        <button onClick={() => this.redirectPage("")}>
            go back
        </button>
        <button onClick={() => this.redirectPage("decision")}>
            go forward
        </button>
      </div>

    );
  }
}

export default withRouter(Storypage);

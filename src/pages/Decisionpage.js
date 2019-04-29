import React, { Component } from 'react';
import '../styles/style.css';


class Decisionpage extends Component {
  render() {
    return (
      <div className="Decisionpage">
        <h1>{this.props.headline}</h1>
        <p>{this.props.panels[0]}</p>
        {/*TODO: remove hardcoded textindex*/}
        <button>Option A</button>
        <button>Option B</button>
        <p></p>
        <p></p>
        <p></p>
        <button>go back</button>
        <button>go forward</button>
      </div>
    );
  }
}

export default Decisionpage;

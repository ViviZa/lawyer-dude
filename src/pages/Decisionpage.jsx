import React, { Component } from 'react';
import '../styles/style.css';
import data from './Decision.json';


class Decisionpage extends Component {
  constructor(props) {
     super(props);
     this.state = {
       headline: '',
       panels: [],
     };
   }

    componentDidMount(){
      const dataString = JSON.stringify(data);
      let jsonData = JSON.parse(dataString);
      console.log(jsonData);
      this.setState({
        panels: jsonData[0].panels,
        headline: jsonData[0].headline
      })
    }

  render() {
    const {headline, panels} = this.state;
    return (
      <div className="Decisionpage">
        <h1>{headline}</h1>
        <p>{panels[0]}</p>
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

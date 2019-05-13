import React, { Component } from 'react';
import SideNavigation from '../../components/SideNavigation';
import '../../styles/style.css';
import data from './Decision.json';
import Buttons from '../components/Buttons';


class Decisionpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      textIndex: 0,
      panels: [],
      headline: ''
    };
  }

  componentDidMount() {
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    console.log(jsonData);
    this.setState({
      panels: jsonData[0].panels,
      headline: jsonData[0].headline
    })

  }

  render() {
    const { headline, panels } = this.state;
    return (
      <div className="Decisionpage">
        <SideNavigation />
        <div className="pagecontent">
          <h1>{headline}</h1>
          <Buttons panels={panels} />
          <p></p>
          <p></p>
          <button>Option A</button>
          <button>Option B</button>
        </div>
      </div>
    );
  }
}

export default Decisionpage;

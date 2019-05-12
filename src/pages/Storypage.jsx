import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
import data from './Story.json';
import defaultImg from './index.png';
import { withRouter } from 'react-router';
import Buttons from '../components/Buttons';

class Storypage extends Component {
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

  redirectPage(pageName) {
    const { history } = this.props;
    history.push("/" + pageName);
  }

  render() {
    const { headline, panels } = this.state;
    return (
      <div className="Storypage">
        <SideNavigation />
        <div className="pagecontent">
          <div className="info-section">
            <img src={defaultImg} className="defaultImg" alt="logo" />
            <p>
              <Buttons panels={panels} />
            </p>
          </div>
          <p></p>
          <button onClick={() => this.redirectPage("")}>
            go back
        </button>
          <button onClick={() => this.redirectPage("decision")}>
            go forward
        </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Storypage);

import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import StartButton from '../components/StartButton';
import { ReactComponent as LDhappy } from '../images/Lawyerdude-head-happy.svg';

class Startpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      panels: [],
      headline: '',
      nextPage: '',
      nextPageID: 0,
    };

    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter( values => values.id === 0);
    localStorage.setItem('visitedPages', JSON.stringify(filteredJSON));
    const nextPageID = filteredJSON[0].nextPageIDs[0];
    this.setState({
      panels: filteredJSON[0].panels,
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID,
    })
  }

  redirectToNextPage(){
    const {history} = this.props;
    const {nextPageID, nextPage} = this.state;
    history.push({
      pathname: nextPage,
      state: {ID: nextPageID},
    });
  }

  render() {
    const { headline} = this.state;

    return (
      <div className="Startpage">
        {/* <SideNavigation ID={0}/> */}
        <div className="startpagecontent">
          <h1>{headline}</h1>
          <h3>An interactive eLearning unit on how to correctly use pictures from the internet without going to jail.</h3>
          <StartButton nextText={this.redirectToNextPage} />
          <p></p>
          <LDhappy className="startlawyer"/>  
        </div>
      </div>
    );
  }
}

export default withRouter(Startpage);

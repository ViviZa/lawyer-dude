import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
import { withRouter } from 'react-router';
import data from '../data.json';
import ForthButton from '../components/ForthButton';

class Startpage extends Component {
 constructor(props) {
    super(props);
    this.state = {
      username: '',
      textIndex: 0,
      panels: [],
      headline: '',
      nextPage: '',
      nextPageID: 0,
    };

    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount(){
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter( values => values.id === 0);
    const nextPageID = filteredJSON[0].nextPageIDs;
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
        <SideNavigation/>
        <div className="pagecontent">
          <h1>{headline}</h1>
          <h3>an e-learning unit on using pictures from the internet without going to jail</h3>
          <ForthButton nextText={this.redirectToNextPage} />
          <p></p>
        </div>
      </div>
    );
  }
}

export default withRouter(Startpage);

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SideNavigation from "../components/SideNavigation";
import data from '../data.json';
import { ReactComponent as LDhappy } from '../images/Lawyerdude-head-happy.svg';
import SettingsButton from '../components/SettingsButton.jsx';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      headline: '',
    };

    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    localStorage.removeItem('visitedPages');
    localStorage.setItem('visitedPages', JSON.stringify(filteredJSON));
    this.setState({
      headline: filteredJSON[0].headline,
    })
  }

  redirectToNextPage(index) {
    const { history } = this.props;
    const { nextPageIDs, nextPages } = this.state;

    history.push({
      pathname: nextPages[index],
      state: { ID: nextPageIDs[index] },
    });
  }

  render() {
    const { ID } = this.props.location.state;
    const { headline } = this.state;
    return (
      <div className="Resources">
        <SideNavigation ID={ID} />
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="startpagecontent overviewpagecontent">
          <h1 className="headline">{headline}</h1>
          <div className="container">
              <LDhappy className="boxlawyer" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Resources);
import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from '../data.json';
import SettingsButton from "../components/SettingsButton";

class GamesOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nextPages: [],
        nextPageIDs: [],
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
    const nextPageIDs = filteredJSON[0].nextPageIDs;
    this.setState({
      nextPages: filteredJSON[0].nextPage,
      nextPageIDs: nextPageIDs,
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
    return (
      <div className="Startpage">
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="pagecontent">
          <h1 className="headline">Games</h1>
            <div className="gamescontainer">
                <button onClick={() => this.redirectToNextPage(0)}>Match the License</button>
            </div>
            <div className="gamescontainer">
                <button onClick={() => this.redirectToNextPage(1)}>CC Licenses and their Use Cases</button>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GamesOverview);

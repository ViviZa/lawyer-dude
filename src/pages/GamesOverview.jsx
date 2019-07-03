import React, { Component } from "react";
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
        <button className="jail-back-btn" onClick={() => this.redirectToNextPage(0)}> 
            Back to overview
        </button>
        <div className="startpagecontent overviewpagecontent">
          <h1 className="headline">Games</h1>
          <div className="container">
            <div className="row">
                <div className="contentBox col">
                    <p className="contentText">Match the License</p>
                    <button className="StartButton hover" onClick={() => this.redirectToNextPage(1)}>PLAY</button>
                </div>
                <div className="contentBox col">
                    <p className="contentText">CC Licenses and their Use Cases</p>
                    <button className="StartButton hover" onClick={() => this.redirectToNextPage(2)}>PLAY</button>
                </div>
                <div className="contentBox col">
                    <p className="contentText">Jail Game 1</p>
                    <button className="StartButton hover" onClick={() => this.redirectToNextPage(3)} >PLAY</button>
                </div>
                <div className="contentBox col">
                    <p className="contentText">Jail Game 2</p>
                    <button className="StartButton hover" onClick={() => this.redirectToNextPage(4)}>PLAY</button>
                </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default withRouter(GamesOverview);

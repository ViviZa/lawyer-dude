import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import BackButtonInactive from "../components/BackButtonInactive";
import ForthButton from "../components/ForthButton";
import { ReactComponent as LDFull } from "../images/Lawyerdude-side.svg";
import SettingsButton from "../components/SettingsButton";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: [],
      headline: "",
      nextPageID: 0,
      nextPage: ""
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/"
      });
      return <div />;
    }
    const { ID } = this.props.location.state;
    const { addingPages } = this.props;
    addingPages(ID);
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    const nextPageID = filteredJSON[0].nextPageIDs[0];
    this.setState({
      panels: filteredJSON[0].panels,
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID
    });
  }

  redirectToNextPage() {
    const { history } = this.props;
    const { nextPageID, nextPage } = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID }
    });
  }

  render() {
    const { panels, headline } = this.state;
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/"
      });
      return <div />;
    }
    const { ID } = this.props.location.state;

    return (
      <div className="Startpage">
        <SideNavigation ID={ID} />
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="pagecontent">
          <h1 className="headline">{headline}</h1>
          <div className="container">
            <div className="row">
              <div className="welcomeblock ">
                <LDFull className="fulllawyer col-12 col-sm-6 col-md-6 col-lg-12 " />
                <div className="welcomepanels col-12 col-sm-6 col-md-6 col-lg-12">
                  <ul>
                    {panels.map((panel, index) => (
                      <li key={index} className="welcomepanel">
                        <div dangerouslySetInnerHTML={{ __html: panel }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="buttoncontainer col">
            <BackButtonInactive />
            <ForthButton nextText={this.redirectToNextPage} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(WelcomePage);

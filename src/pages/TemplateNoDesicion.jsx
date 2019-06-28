import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import BackButton from "../components/BackButton";
import BackButtonInactive from "../components/BackButtonInactive";
import ForthButton from "../components/ForthButton";
import SettingsButton from "../components/SettingsButton";
import { ReactComponent as LDHeadHappy } from "../images/Lawyerdude-head-happy.svg";
import { ReactComponent as LDLamaSceptical } from "../images/Lawyerdude-llama-head-sceptical.svg";
import ResourcePanel from "./../components/ResourcePanel";

class NoDecision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      panels: [],
      headline: "",
      nextPageID: 0,
      nextPage: ""
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/",
      });
      return <div/>
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

  handleSubmit(event) {
    this.props.setUserName(this.state.username);
    this.props.goToNextPage(this.props.nextPage);
    event.preventDefault();
  }

  nextText() {
    const { panels, textIndex } = this.state;
    const theSize = panels.length - 1;
    if (textIndex >= 0 && textIndex < theSize) {
      this.setState(prevState => {
        return { textIndex: prevState.textIndex + 1 };
      });
    }
  }

  previousText() {
    const theSize = this.state.panels.length - 1;
    if (this.state.textIndex > 0 && this.state.textIndex <= theSize) {
      this.setState(prevState => {
        return { textIndex: prevState.textIndex - 1 };
      });
    }
  }

  render() {
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/",
      });
      return <div/>;
    }
    const { panels, textIndex, headline } = this.state;
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/",
      });
    }
    const { ID } = this.props.location.state;
    return (
      <div className="Startpage">
        <SideNavigation ID={ID} />
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="pagecontent">
          <h1 className="headline">{headline}</h1>
          {(panels[textIndex] &&
          panels[textIndex].text !== undefined &&
          panels[textIndex].type === "resource") ? (
            <ResourcePanel
              text={panels[textIndex].text}
              images={panels[textIndex].images}
            />
          ) : (
            <div>
              <div className="speech">
                <div className="speechbubbletext"
                    dangerouslySetInnerHTML={{ __html: panels[textIndex] }} />
              </div>
              <div className="lama-container">
                <LDLamaSceptical className="lama-sceptical" />
              </div>
              <div className="speechlawyer-container">
                <LDHeadHappy className="speechlawyer-happy" />
              </div>
            </div>
          )}
          {textIndex === 0 && panels.length > 1 ? (
            <div className="buttoncontainer">
              <BackButtonInactive />
              <ForthButton nextText={this.nextText} />
            </div>
          ) : textIndex + 1 < panels.length ? (
            <div className="buttoncontainer">
              <BackButton previousText={this.previousText} />
              <ForthButton nextText={this.nextText} />
            </div>
          ) : (
            <div className="buttoncontainer">
              <BackButtonInactive />
              <ForthButton nextText={this.redirectToNextPage} />
            </div>
          )}
          <p />
        </div>
      </div>
    );
  }
}

export default withRouter(NoDecision);

import React, { Component } from "react";
import data from "../data.json";
import { withRouter } from "react-router";
import { ReactComponent as LDHeadSceptical } from "../images/Lawyerdude-head-sceptical.svg";
import JailGameTwo from "../games/JailGameTwo/JailGameTwo.jsx";
import JailGame1 from "../games/JailGame1";
import ForthButton from "./../components/ForthButton";
import BackButton from "./../components/BackButton";
import ResourcePanel from "./../components/ResourcePanel";

class Jailpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      panels: [],
      headline: "",
      nextPageID: 0,
      nextPage: "",
      showGame: false,
      randomGame: 0
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    const nextPageID = filteredJSON[0].nextPageIDs[0];
    const gameNumber = Math.floor(Math.random() * Math.floor(2));
    this.setState({
      panels: filteredJSON[0].panels,
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID,
      randomGame: gameNumber
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

  redirectToNextPage() {
    const { history } = this.props;
    const { nextPageID, nextPage } = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID }
    });
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
    const { panels, textIndex, showGame, randomGame } = this.state;
    return (
      <div className="Jailpage">
        <div className="jailpagecontent">
          {showGame ? (
            randomGame === 0 ? (
              <JailGameTwo />
            ) : (
              <JailGame1 ID={28} />
            )
          ) : panels[textIndex] &&
            panels[textIndex].text !== undefined &&
            panels[textIndex].type === "resource" ? (
            <ResourcePanel
              text={panels[textIndex].text}
              images={panels[textIndex].images}
            />
          ) : (
            <div>
              <div className="jail-speech">
                <p className="speechbubbletext-jail">
                  <div
                    dangerouslySetInnerHTML={{ __html: panels[textIndex] }}
                  />
                </p>
              </div>
              <div className="speechlawyer-sceptical-container">
                <LDHeadSceptical className="speechlawyer-sceptical" />
              </div>
            </div>
          )}
          {textIndex === 0 && panels.length > 1 ? (
            <div>
              <ForthButton nextText={this.nextText} />
            </div>
          ) : textIndex + 1 < panels.length ? (
            <div>
              <BackButton previousText={this.previousText} />
              <ForthButton nextText={this.nextText} />
            </div>
          ) : (
            !showGame && (
              <ForthButton nextText={() => this.setState({ showGame: true })} />
            )
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Jailpage);

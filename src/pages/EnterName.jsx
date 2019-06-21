import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import ForthButton from "../components/ForthButton";
import BackButton from "./../components/BackButton";
import BackButtonInactive from "../components/BackButtonInactive";
import SettingsButton from "../components/SettingsButton";
import { ReactComponent as Llama } from "../images/Lawyerdude-llama.svg";
import { ReactComponent as LDHeadHappy } from "../images/Lawyerdude-head-happy.svg";

class EnterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      panels: [],
      headline: "",
      nextPageID: 0,
      nextPage: "",
      username: "",
      errorText: ""
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
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

  redirectToNextPage(event) {
    if (this.state.username === "") {
      event.preventDefault();
      this.setState({ errorText: "Please enter a name!" });
    } else {
      this.setState({ errorText: "" });
      localStorage.setItem("username", JSON.stringify(this.state.username));
      const { history } = this.props;
      this.setState({ username: event.target.value });
      const { nextPageID, nextPage } = this.state;
      history.push({
        pathname: nextPage,
        state: { ID: nextPageID }
      });
    }
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
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
    const { panels, textIndex, headline, errorText } = this.state;
    const { ID } = this.props.location.state;
    return (
      <div className="Startpage">
        <SideNavigation ID={ID} />
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="pagecontent">
          <h1>{headline}</h1>
          <div className="llama-container">
            <Llama className="entername-llama" />
          </div>
          <div className="speech entername">
            <div className="speechbubbletext entername">
              <div dangerouslySetInnerHTML={{ __html: panels[textIndex] }} />
            </div>
          </div>
          <div className="speechlawyer-container entername">
            <LDHeadHappy className="speechlawyer-happy" />
          </div>
          {textIndex === 0 ? (
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
            <div className="entername-form">
              <form onSubmit={event => this.redirectToNextPage(event)}>
                <div className={"errorMessage"}>{errorText}</div>
                <label className="entername-label">
                  <input
                    className="entername-input"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  Enter your name
                </label>
                <button
                  className="save-name-btn"
                  type="submit"
                  value="Let's go"
                >
                  Let's go
                  </button>
              </form>
            </div>
          )}
          <p />
        </div>
      </div>
    );
  }
}

export default withRouter(EnterName);

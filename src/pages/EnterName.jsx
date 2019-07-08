import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import ForthButton from "../components/ForthButton";
import BackButton from "./../components/BackButton";
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
    this.redirectToLastPage = this.redirectToLastPage.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const { addingPages } = this.props;
    addingPages(ID);
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    const nextPageID = filteredJSON[0].nextPageIDs[0];
    this.setState(
      {
        panels: filteredJSON[0].panels,
        headline: filteredJSON[0].headline,
        nextPage: filteredJSON[0].nextPage,
        nextPageID: nextPageID
      },
      () => {
        const goBack = JSON.parse(localStorage.getItem("goBack"));
        if (goBack) {
          const goBack = false;
          localStorage.setItem("goBack", JSON.stringify(goBack));
          this.setState({ textIndex: this.state.panels.length - 1 });
        }
      }
    );
  }

  redirectToNextPage(event) {
    if (this.state.username === "") {
      event.preventDefault();
      this.setState({ errorText: "Please enter a name!" });
    } else {
      event.preventDefault();
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

  redirectToLastPage() {
    const goBack = true;
    localStorage.setItem("goBack", JSON.stringify(goBack));
    this.props.history.goBack();
  }

  render() {
    if (this.props.location.state === undefined) {
      this.props.history.push({
        pathname: "/"
      });
      return <div />;
    }
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
            <div className="buttoncontainer col">
              <BackButton previousText={this.redirectToLastPage} />
              <ForthButton nextText={this.nextText} />
            </div>
          ) : textIndex + 1 < panels.length ? (
            <div className="buttoncontainer col">
              <BackButton previousText={this.previousText} />
              <ForthButton nextText={this.nextText} />
            </div>
          ) : (
            <div className="entername-form container">
              <form onSubmit={event => this.redirectToNextPage(event)}>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6">
                    <div className={"errorMessage"}>{errorText}</div>
                    <input
                      className="entername-input"
                      type="text"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    <label className="entername-label">Enter your name</label>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6">
                    <button
                      className="save-name-btn"
                      type="submit"
                      value="Let's go"
                    >
                      Let's go
                    </button>
                  </div>
                </div>
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

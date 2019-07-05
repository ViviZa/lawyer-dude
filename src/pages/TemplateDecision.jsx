import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import BackButton from "../components/BackButton";
import ForthButton from "../components/ForthButton";
import { ReactComponent as LDHeadHappy } from "../images/Lawyerdude-head-happy.svg";
import { ReactComponent as LDLamaSceptical } from "../images/Lawyerdude-llama-head-sceptical.svg";
import { ReactComponent as LDLamaHappy } from "../images/Lawyerdude-llama-head-happy.svg";
import SettingsButton from "../components/SettingsButton";
import ResourcePanel from "./../components/ResourcePanel";

class TemplateDecision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      panels: [],
      decisions: [],
      nextPageIDs: [],
      nextPages: []
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.replaceUsername = this.replaceUsername.bind(this);
    this.redirectToLastPage = this.redirectToLastPage.bind(this);
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
    const nextPageIDs = filteredJSON[0].nextPageIDs;
    this.setState(
      {
        panels: filteredJSON[0].panels,
        decisions: filteredJSON[0].decisions,
        headline: filteredJSON[0].headline,
        nextPages: filteredJSON[0].nextPage,
        nextPageIDs: nextPageIDs
      },
      () => {
        this.replaceUsername();
        const goBack = JSON.parse(localStorage.getItem("goBack"));
        if (goBack) {
          const goBack = false;
          localStorage.setItem("goBack", JSON.stringify(goBack));
          this.setState({ textIndex: this.state.panels.length - 1 });
        }
      }
    );
  }

  replaceUsername() {
    const { panels } = this.state;
    const username = localStorage.getItem("username");
    let usernameParsed = JSON.parse(username);
    const newPanels = panels.map(panel => {
      if (!panel["text"]) {
        return panel.replace("{username}", usernameParsed);
      } else {
        return panel;
      }
    });
    this.setState({ panels: newPanels });
  }

  redirectToNextPage(index) {
    const { history } = this.props;
    const { nextPageIDs, nextPages } = this.state;

    history.push({
      pathname: nextPages[index],
      state: { ID: nextPageIDs[index] }
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

  redirectToLastPage() {
    const goBack = true;
    localStorage.setItem("goBack", JSON.stringify(goBack));
    this.props.history.goBack();
  }

  render() {
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/"
      });
      return <div />;
    }
    const { panels, textIndex, headline, decisions } = this.state;
    const { ID } = this.props.location.state;
    let lamasMood;
    if (textIndex === panels.length - 1) {
      lamasMood = <LDLamaHappy className="lama-happy" />;
    } else {
      lamasMood = <LDLamaSceptical className="lama-sceptical" />;
    }

    return (
      <div className="Startpage">
        <SideNavigation ID={ID} />
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="pagecontent">
          <h1>{headline}</h1>
          {panels[textIndex] &&
          panels[textIndex].text !== undefined &&
          panels[textIndex].type === "resource" ? (
            <ResourcePanel
              text={panels[textIndex].text}
              images={panels[textIndex].images}
            />
          ) : (
            <div>
              <div className="speech">
                <div
                  className="speechbubbletext"
                  dangerouslySetInnerHTML={{ __html: panels[textIndex] }}
                />
              </div>
              <div className="lama-container">{lamasMood}</div>
              <div className="speechlawyer-container">
                <LDHeadHappy className="speechlawyer-happy" />
              </div>
            </div>
          )}

          {textIndex === 0 && panels.length > 1 ? (
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
            <div className="answer">
              <div className="answerbubbletext">
                <ol type="A">
                  {decisions.map((decision, index) => {
                    return (
                      <li>
                        <div
                          className="option_btn"
                          onClick={() => this.redirectToNextPage(index)}
                        >
                          {decision}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          )}
          <p />
        </div>
      </div>
    );
  }
}

export default withRouter(TemplateDecision);

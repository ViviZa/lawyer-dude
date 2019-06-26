import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as LDicon } from "../images/Lawyerdude-head-icon.svg";
import { Link } from "react-router-dom";
import data from "../data.json";
import { withRouter } from "react-router";

class SideNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedPages: [],
      open: false
    };

    this.burgerToggle = this.burgerToggle.bind(this);
    this.highlightedLink = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props;
    let visitedPages = JSON.parse(localStorage.getItem("visitedPages"));
    const dataString = JSON.stringify(data);
    const jsonData = JSON.parse(dataString);
    const ids = visitedPages.map(page => page.id);
    const filteredJSON = jsonData.filter(values => ids.includes(values.id));

    let nextPageIDs = 0;
    for (let [index, val] of visitedPages.entries()) {
      if (Array.isArray(val.nextPageIDs)) {
        if (val.nextPageIDs.includes(ID)) {
          nextPageIDs = index + 1;
        }
      } else {
        if (val.nextPageIDs === ID) {
          nextPageIDs = index + 1;
        }
      }
    }
    const visitedNextPage = filteredJSON.filter(value =>
      value.nextPageIDs.includes(ID)
    );
    if (visitedNextPage.length > 0 && !ids.includes(ID)) {
      visitedPages.length = nextPageIDs;
    }

    if (!ids.includes(ID)) {
      const currentPage = jsonData.filter(values => values.id === ID);
      visitedPages.push(currentPage[0]);
    }
    this.setState({ visitedPages: visitedPages });
    localStorage.setItem("visitedPages", JSON.stringify(visitedPages));

    if (this.highlightedLink.current) {
      this.scrollToBottom();
    }
  }

  componentDidUpdate() {
    if (this.highlightedLink.current !== null) {
      this.scrollToBottom(this.highlightedLink.current);
    }
  }

  redirectToNextPage(url, id) {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { ID: id }
    });
  }

  burgerToggle() {
    let { open } = this.state;
    let isOpen = !open;
    this.setState({ open: isOpen });
    var linksEl = document.querySelector(".narrowLinks");
    var speechEl = document.querySelector(".speech");
    if (linksEl.style.display === "block") {
      linksEl.style.display = "none";
    } else {
      linksEl.style.display = "block";
      linksEl.style.background = "rgba(13, 62, 89, 0.9)";
      linksEl.style.height = "100%";
      speechEl.style.zIndex = "-10";
    }
  }

  scrollToBottom(highlightedLink) {
    highlightedLink.scrollIntoView();
  }

  renderPages(visitedPages, ID) {
    return (
      <ul>
        {visitedPages.map(page => {
          return (
            <li className="linkWrapper" key={page.id}>
              <div className={page.id === ID ? "focusIndicator" : ""}>
                &nbsp;
              </div>
              <Link
                className={
                  page.id === ID ? "highlightedLink" : "sideNavigationLink"
                }
                to={{
                  pathname: page.pageurl,
                  state: { ID: page.id }
                }}
              >
                <div ref={page.id === ID ? this.highlightedLink : ""} />
                {page.headline}
              </Link>
            </li>
          );
        })}
        <li className="li-inactive">
          <a href="#">Unlock story</a>
        </li>
      </ul>
    );
  }

  render() {
    const { ID } = this.props;
    const { visitedPages, open } = this.state;

    let menuIcon;
    if (open) {
      menuIcon = (
        <FontAwesomeIcon icon="times" size="lg" onClick={this.burgerToggle} />
      );
    } else {
      menuIcon = (
        <FontAwesomeIcon icon="bars" size="lg" onClick={this.burgerToggle} />
      );
    }
    return (
      <nav>
        <div className="SideNavigation">
          <div className="logo-box">
            <LDicon className="lawyericon" />
          </div>
          <div className="navWide">
            <div className="wideDiv">{this.renderPages(visitedPages, ID)}</div>
          </div>
          <div className="navNarrow">
            <i>{menuIcon}</i>
            <div className="narrowLinks">
              {this.renderPages(visitedPages, ID)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(SideNavigation);

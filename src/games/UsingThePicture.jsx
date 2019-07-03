import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import ForthButton from "../components/ForthButton";
import Select from "react-select";
import { CopyToClipboard } from "react-copy-to-clipboard";
import BackButton from "./../components/BackButton";

const options = [
  {
    value: "1",
    label: "CC BY",
    link: "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    value: "2",
    label: "CC BY-SA",
    link: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    value: "3",
    label: "CC BY-ND",
    link: "https://creativecommons.org/licenses/by-nd/4.0/"
  },
  {
    value: "4",
    label: "CC BY-NC",
    link: "https://creativecommons.org/licenses/by-nc/4.0/"
  },
  {
    value: "5",
    label: "CC BY-NC-SA",
    link: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  },
  {
    value: "6",
    label: "CC BY-NC-ND",
    link: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
  },
  {
    value: "7",
    label: "CC-0",
    link: "https://creativecommons.org/publicdomain/zero/1.0/"
  }
];

class UsingTheImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      nextPageID: 0,
      nextPage: "",
      submitted: false,
      imgUrl: "",
      link: "",
      copywriter: "",
      license: "",
      title: "",
      error: false,
      noticeCreated: false,
      copied: false
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.changeImgUrl = this.changeImgUrl.bind(this);
    this.createNotice = this.createNotice.bind(this);
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
    const nextPageID = filteredJSON[0].nextPageIDs[0];
    this.setState({
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID
    });
  }

  changeImgUrl(event) {
    this.setState({ imgUrl: event.target.value, submitted: false });
  }

  updateTextFieldValue(event, key) {
    this.setState({ [key]: event.target.value });
  }

  handleDropdownChange = license => {
    this.setState({ license });
  };

  redirectToNextPage() {
    const { history } = this.props;
    const { nextPageID, nextPage } = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID }
    });
  }

  createNotice() {
    const { license } = this.state;
    if (license === "") {
      this.setState({ error: true });
    } else {
      this.setState({ noticeCreated: true, error: false, submitted: true });
    }
  }

  redirectToLastPage() {
    const goBack = true;
    localStorage.setItem("goBack", JSON.stringify(goBack));
    this.props.history.goBack();
  }

  renderFirstPage() {
    const { imgUrl, link, license, copywriter, title, error } = this.state;
    return (
      <div>
        <div>
          <div className="licenceProperty-container">
            <input
              className="picture-upload-input"
              name="image-upload"
              type="text"
              value={imgUrl}
              onChange={this.changeImgUrl}
              placeholder="Please submit your image URL here"
            />
            <label for="image-upload" className="licenceProperty">
              Paste your image URL
            </label>
          </div>
        </div>
        <div>
          <div className="licenceProperty-container">
            <input
              className="picture-specs-input"
              name="title"
              type="text"
              value={title}
              onChange={ev => this.updateTextFieldValue(ev, "title")}
              placeholder="What is the name of the image?"
            />
            <label for="title" className="licenceProperty">
              Title
            </label>
          </div>
          <div>
            <div className="licenceProperty-container">
              <input
                className="picture-specs-input"
                type="text"
                value={copywriter}
                onChange={ev => this.updateTextFieldValue(ev, "copywriter")}
                name="author"
                placeholder="Who owns the image?"
              />
              <label for="author" className="licenceProperty">
                Author
              </label>
            </div>
          </div>
          <div>
            <div className="licenceProperty-container">
              <input
                className="picture-specs-input"
                name="source"
                type="text"
                value={link}
                onChange={ev => this.updateTextFieldValue(ev, "link")}
                placeholder="Where can I find it?"
              />
              <label for="source" className="licenceProperty">
                Source
              </label>
            </div>
          </div>
          <div>
            <div className="selectProperty-container">
              <div>
                <div
                  className={
                    license === "" && error
                      ? "errorContainer"
                      : "license-select-wrap"
                  }
                >
                  <Select
                    value={license}
                    onChange={this.handleDropdownChange}
                    options={options}
                    className="licenseDropdown"
                  />
                  <div className="selectProperty">License Notice</div>
                </div>
                  {license === "" && error && (
                    <span>Please select a license</span>
                  )}
              </div>
            </div>
          </div>
          <button className="url-upload-btn" onClick={this.createNotice}>
            Save
          </button>
        </div>
      </div>
    );
  }

  renderSecondPage() {
    const { imgUrl, link, license, copywriter, title, copied } = this.state;
    return (
      <div>
        <div className="imgView">
          <img src={imgUrl} className="imageContent" alt={imgUrl} />
        </div>
        <div>
          <p>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </p>
          License: {copywriter},{" "}
          <a href={license.link} target="_blank" rel="noopener noreferrer">
            {license.label}
          </a>
          <CopyToClipboard
            text={`Title: ${title}, \n License: ${copywriter}, ${
              license.label
            }, \n Link: ${link}`}
            onCopy={() => this.setState({ copied: true })}
          >
            <div>
              <button className="load-img-btn">Copy to clipboard</button>
              {copied && <span>Copied!</span>}
            </div>
          </CopyToClipboard>
        </div>
        <BackButton previousText={this.redirectToLastPage} />
        <ForthButton nextText={this.redirectToNextPage} />
      </div>
    );
  }

  render() {
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/"
      });
      return <div />;
    }
    const { ID } = this.props.location.state;

    const { noticeCreated } = this.state;

    return (
      <div className="MatchTheLicense">
        <SideNavigation ID={ID} />
        <div className="pagecontent">
          <h1>Using the Image</h1>
          {!noticeCreated ? this.renderFirstPage() : this.renderSecondPage()}
        </div>
      </div>
    );
  }
}

export default withRouter(UsingTheImage);

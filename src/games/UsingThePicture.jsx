import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import ForthButton from "../components/ForthButton";
import Select from "react-select";
import BackButton from "./../components/BackButton";
import Placeholder from "../images/index.png";
import SpeechBubbleContainer from "./../components/SpeechBubbleContainer";

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
      copywriter: "",
      license: "",
      title: "",
      error: false,
      noticeCreated: false,
      licenseNotice: "",
      disclaimer: "",
      textIndex: 0,
      panels: []
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.changeImgUrl = this.changeImgUrl.bind(this);
    this.createNotice = this.createNotice.bind(this);
    this.redirectToLastPage = this.redirectToLastPage.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.setDisabled = this.setDisabled.bind(this);
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
      panels: filteredJSON[0].panels,
      nextPage: filteredJSON[0].nextPage,
      disclaimer: filteredJSON[0].disclaimer,
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
    const { license, title, copywriter, imgUrl } = this.state;
    if (license === "") {
      this.setState({ error: true });
    } else {
      const licenseNotice = `${copywriter}${imgUrl && ` (`}${imgUrl}${imgUrl &&
        `), `}${title && `"`}${title}${title && `", `}${license.link}`;
      this.setState({
        noticeCreated: true,
        error: false,
        submitted: true,
        licenseNotice
      });
    }
  }

  redirectToLastPage() {
    const goBack = true;
    localStorage.setItem("goBack", JSON.stringify(goBack));
    this.props.history.goBack();
  }

  resetValues() {
    this.setState({
      noticeCreated: false,
      error: false,
      submitted: false,
      licenseNotice: ""
    });
  }

  nextText() {
    this.setState(prevState => {
      return { textIndex: prevState.textIndex + 1 };
    });
  }

  previousText() {
    this.setState(prevState => {
      return { textIndex: prevState.textIndex - 1 };
    });
  }

  setDisabled(){
    const { imgUrl, license, copywriter, title, } = this.state;
    return (!(imgUrl !== '' && license !== '' && copywriter !== '' && title !== ''));
  }

  renderFirstPage() {
    const { imgUrl, license, copywriter, title, error } = this.state;
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
            <label htmlFor="image-upload" className="licenceProperty">
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
            <label htmlFor="title" className="licenceProperty">
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
              <label htmlFor="author" className="licenceProperty">
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
                value={imgUrl}
                onChange={ev => this.updateTextFieldValue(ev, "imgUrl")}
                placeholder="Where can I find it?"
              />
              <label htmlFor="source" className="licenceProperty">
                Source
              </label>
            </div>
          </div>
          <div>
            <div className="selectProperty-container">
              <div className="select-container">
                <div className="license-select-wrap">
                  <Select
                    value={license}
                    onChange={this.handleDropdownChange}
                    options={options}
                    className={
                      license === "" && error
                        ? "errorDropdown"
                        : "licenseDropdown"
                    }
                  />
                </div>
                {license === "" && error ? (
                  <div className="using-image-error">
                    Please select a license
                  </div>
                ) : (
                  <div className="using-image-error">&nbsp;</div>
                )}
              </div>
              <div className="selectProperty">License</div>
            </div>
          </div>
          <BackButton previousText={this.previousText} />
          <button className="url-upload-btn" onClick={this.createNotice} disabled={this.setDisabled()}>
            Generate
          </button>
        </div>
      </div>
    );
  }

  renderSecondPage() {
    const { imgUrl, licenseNotice, disclaimer } = this.state;
    return (
      <div>
        <div className="imgView">
          {imgUrl ? (
            <img src={imgUrl} className="imageContent" alt={imgUrl} />
          ) : (
            <img src={Placeholder} className="imageContent" alt={imgUrl} />
          )}
        </div>
        <div className="notice-container">
          <div className="copy-button">One possible license notice:</div>
          <textarea
            className="license-notice"
            value={licenseNotice}
            onChange={ev => this.updateTextFieldValue(ev, "licenseNotice")}
          />
        </div>
        <div>{disclaimer}</div>
        <BackButton previousText={this.resetValues} />
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
    const { noticeCreated, headline, panels, textIndex } = this.state;
    return (
      <div className="MatchTheLicense">
        <SideNavigation ID={ID} />
        <div className="pagecontent">
          <h1>{headline}</h1>
          {textIndex === 0 && panels.length >= 1 ? (
            <div>
              <SpeechBubbleContainer panels={panels} textIndex={textIndex} />
              <div className="buttoncontainer col">
                <BackButton previousText={this.redirectToLastPage} />
                <ForthButton nextText={this.nextText} />
              </div>
            </div>
          ) : textIndex + 1 < panels.length ? (
            <div>
              <SpeechBubbleContainer panels={panels} textIndex={textIndex} />
              <div className="buttoncontainer col">
                <BackButton previousText={this.previousText} />
                <ForthButton nextText={this.nextText} />
              </div>
            </div>
          ) : !noticeCreated ? (
            this.renderFirstPage()
          ) : (
            this.renderSecondPage()
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(UsingTheImage);

import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import BackButton from "../components/BackButton";
import ForthButton from "../components/ForthButton";
import Select from "react-select";
import update from "immutability-helper";
import SpeechBubbleContainer from "./../components/SpeechBubbleContainer";
import SettingsButton from "../components/SettingsButton";
import matchTheLicenseData from "./MatchTheLicenseData.json";

const options = [
  { value: "CC0", label: "CC0" },
  { value: "CC-BY", label: "CC-BY" },
  { value: "CC-BY-SA", label: "CC-BY-SA" },
  { value: "CC-BY-ND", label: "CC-BY-ND" },
  { value: "CC-BY-NC-SA", label: "CC-BY-NC-SA" },
  { value: "CC-BY-NC-ND", label: "CC-BY-NC-ND" }
];

class MatchTheLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      textIndex: 0,
      panels: [],
      nextPageID: 0,
      nextPage: "",
      count: 0,
      questions: [],
      selectedOption: [
        {
          option: [],
          errorText: "",
          solutionText: ""
        },
        {
          option: [],
          errorText: "",
          solutionText: ""
        },
        {
          option: [],
          errorText: "",
          solutionText: ""
        },
        {
          option: [],
          errorText: "",
          solutionText: ""
        }
      ]
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.setCount = this.setCount.bind(this);
    this.redirectToLastPage = this.redirectToLastPage.bind(this);
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
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
      panels: filteredJSON[0].panels,
      nextPageID: nextPageID
    });

    const matchTheLicenseString = JSON.stringify(matchTheLicenseData);
    const licenseArray = JSON.parse(matchTheLicenseString);
    this.setState({ questions: licenseArray });
  }

  redirectToNextPage() {
    const { history } = this.props;
    const { nextPageID, nextPage } = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID }
    });
  }

  handleChange(index, checkedOption) {
    const { count } = this.state;
    this.setState({
      selectedOption: update(this.state.selectedOption, {
        [index + count]: { option: { $set: checkedOption } }
      })
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

  setCount(value) {
    this.setState({ count: value });
  }

  redirectToLastPage() {
    const goBack = true;
    localStorage.setItem("goBack", JSON.stringify(goBack));
    this.props.history.goBack();
  }

  validate() {
    const { selectedOption, questions, count } = this.state;
    let newState = selectedOption;
    for (let i = 0; i < 2; i++) {
      let correctSelectedSolutions = [];
      const selectedOptionValues = selectedOption[i + count].option.map(
        option => option.value
      );
      questions[i + count].validOptions.forEach(option =>
        selectedOptionValues.includes(option)
          ? correctSelectedSolutions.push(option)
          : null
      );

      if (
        questions[i + count].validOptions.length ===
        correctSelectedSolutions.length
      ) {
        newState[i + count].solutionText =
          "Congratulations! You got everything right!";
        newState[i + count].errorText = "";
      } else if (correctSelectedSolutions.length === 0) {
        newState[i + count].errorText =
          `Not quite right, you didn't get any correct solutions. The correct answers would have been ` +
          questions[i + count].validOptions.map(option => option);
        newState[i + count].solutionText = "";
      } else {
        newState[i + count].errorText =
          `Almost right, you got ${correctSelectedSolutions.length} of ${
            questions[i + count].validOptions.length
          } correct solutions. The correct answers would have been ` +
          questions[i + count].validOptions.map(option => option);
        newState[i + count].solutionText = "";
      }
    }
    this.setState({ selectedOption: newState });
  }

  render() {
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/"
      });
      return <div />;
    }
    const { ID } = this.props.location.state;
    const { selectedOption, questions, count, textIndex, panels } = this.state;

    return (
      <div className="MatchTheLicense">
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <SideNavigation ID={ID} />
        <div className="pagecontent">
          <h1>Match the License</h1>
          {textIndex === 0 && panels.length >= 1 ? (
            <SpeechBubbleContainer panels={panels} textIndex={textIndex} />
          ) : (
            <div className="matchQuestions">
              {Array.from(Array(2), (e, i) => {
                return (
                  <div className="matchSection" key={i}>
                    <div className="matchQuestion">
                      <div className="match-question-container">
                        <div
                          className="match-question-text"
                          dangerouslySetInnerHTML={{
                            __html:
                              questions.length > 0 && questions[i + count].text
                          }}
                        />
                        <Select
                          value={selectedOption[i + count].option}
                          onChange={ev => this.handleChange(i, ev)}
                          options={options}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          isSearchable={false}
                        />
                      </div>
                    </div>
                    <div className="errorMessage">
                      {selectedOption[i + count].errorText}
                    </div>
                    <div className="successMessage">
                      {selectedOption[i + count].solutionText}
                    </div>
                  </div>
                );
              })}
              <button className="match-btn" onClick={() => this.validate()}>
                Submit answers
              </button>
            </div>
          )}
          {textIndex === 0 && panels.length >= 1 ? (
            <div className="buttoncontainer col">
              <BackButton previousText={this.redirectToLastPage} />
              <ForthButton nextText={this.nextText} />
            </div>
          ) : textIndex + 1 < panels.length ? (
            <div className="buttoncontainer col">
              <BackButton previousText={this.previousText} />
              <ForthButton nextText={this.nextText} />
            </div>
          ) : count !== 2 ? (
            <div className="buttoncontainer col">
              <BackButton previousText={this.previousText} />
              <ForthButton nextText={() => this.setCount(2)} />
            </div>
          ) : (
            <div className="buttoncontainer col">
              <BackButton previousText={() => this.setCount(0)} />
              <ForthButton nextText={this.redirectToNextPage} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(MatchTheLicense);

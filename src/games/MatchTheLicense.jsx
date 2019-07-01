import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import BackButtonInactive from "../components/BackButtonInactive";
import ForthButton from "../components/ForthButton";
import Select from "react-select";
import update from "immutability-helper";
import { ReactComponent as LDHeadHappy } from "../images/Lawyerdude-head-happy.svg";

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
      nextPageID: 0,
      nextPage: "",
      count: 0,
      questions: [],
      intro: true,
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
    this.incCount = this.incCount.bind(this);
    this.setIntro = this.setIntro.bind(this);
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
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
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

  incCount() {
    this.setState({ count: 3 });
  }

  setIntro() {
    this.setState({ intro: false });
  }


  validate() {
    const { selectedOption, questions, count } = this.state;
    let newState = selectedOption;
    for (let i = 0; i < 3; i++) {
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
    const { ID } = this.props.location.state;
    const { selectedOption, questions, count, intro } = this.state;

    return (
      <div className="MatchTheLicense">
        <SideNavigation ID={ID} />
        <div className="pagecontent">
          <h1>Match the License</h1>
          {intro ? (
            <div>
              <div className="speech">
                <div className="speechbubbletext">
                  <div>You have experienced that the filter options search engines
                  offer are not equal to the CC licenses one is actually looking
                  for. Therefore, it is more important to focus on your
                  intention when using a picture from the internet. To get an
                  idea of the right license for your use case we prepared some
                  examples. Now it’s your turn to find the right license! It is
                  possible to choose multiple licenses.
                  </div>
                </div>
              </div>
              <div className="speechlawyer-container">
                <LDHeadHappy className="speechlawyer-happy" />
              </div>
            </div>
          ) : (
            <div className="matchQuestions">
              {Array.from(Array(3), (e, i) => {
                return (
                  <div className="matchSection">
                    <div className="matchQuestion">
                      {questions.length > 0 && questions[i + count].text}
                    </div>
                    <Select
                      value={selectedOption[i + count].option}
                      onChange={ev => this.handleChange(i, ev)}
                      options={options}
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isSearchable={false}
                    />
                    <div className="errorMessage">
                      {selectedOption[i + count].errorText}
                    </div>
                    <div className="successMessage">
                      {selectedOption[i + count].solutionText}
                    </div>
                  </div>
                );
              })}
              <button className="match-btn" onClick={() => this.validate()}>Submit answers</button>
            </div>
          )}
        </div>
        {intro ? (
          <div className="buttoncontainer">
            <BackButtonInactive />
            <ForthButton nextText={this.setIntro} />
          </div>
        ) : count !== 3 ? (
          <div className="buttoncontainer">
            <BackButtonInactive />
            <ForthButton nextText={this.incCount} />
          </div>
        ) : (
          <div className="buttoncontainer">
            <BackButtonInactive />
            <ForthButton nextText={this.redirectToNextPage} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(MatchTheLicense);

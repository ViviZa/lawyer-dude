import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import BackButtonInactive from "../components/BackButtonInactive";
import ForthButton from "../components/ForthButton";
import Select from "react-select";
import update from "immutability-helper";

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
    const {count} = this.state;
    this.setState({
      selectedOption: update(this.state.selectedOption, {
        [index + count]: { option: { $set: checkedOption } }
      })
    });
  }

  incCount(){
    this.setState({count: 3});
  }

  validate() {
    const { selectedOption, questions, count } = this.state;
    let newState = selectedOption;
    for (let i = 0; i < 3; i++) {
      const selectedOptionValues = selectedOption[i + count].option.map(
        option => option.value
      );
      if (
        questions[i + count].validOptions.length === selectedOptionValues.length &&
        questions[i + count].validOptions.every(
          (value, index) => value === selectedOptionValues[index]
        )
      ) {
        newState[i + count].solutionText = "Correct Solution!";
      } else {
        newState[i + count].errorText =
          "Wrong, correct solution would have been: " +
          questions[i + count].validOptions.map(option => option);
      }
    }
    this.setState({ selectedOption: newState });
  }

  render() {
    const { ID } = this.props.location.state;
    const { selectedOption, questions, count } = this.state;

    return (
      <div className="MatchTheLicense">
        <SideNavigation ID={ID} />
        <div className="pagecontent">
          <h1>Match the License</h1>
          <div>
            {Array.from(Array(3), (e, i) => {
              return (
                <div>
                  <div>{questions.length > 0 && questions[i + count].text}</div>
                  <div className="errorMessage">
                    {selectedOption[i + count].errorText}
                  </div>
                  <div>{selectedOption[i + count].solutionText}</div>
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
              );
            })}
          </div>
          <button onClick={() => this.validate()}>Check</button>
        </div>
        {count !== 3 ? (
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

import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import BackButtonInactive from "../components/BackButtonInactive";
import ForthButton from "../components/ForthButton";
import Select from "react-select";

import matchTheLicenseData from "./MatchTheLicense.json";

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
      questions: [],
      selectedOption1: null,
      selectedOption2: null,
      selectedOption3: null,
      errorText1: "",
      errorText2: "",
      errorText3: ""
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(key, selectedOption) {
    console.log({ selectedOption });
    this.setState({ [key]: selectedOption });
  }

  validate() {
    const {
      selectedOption1,
      selectedOption2,
      selectedOption3,
      questions
    } = this.state;
    if (
      questions[0].validOptions.length === selectedOption1.length &&
      questions[0].validOptions.every(
        (value, index) => value === selectedOption1[index]
      )
    ) {
    } else {
      this.setState({
        errorText1:
          "Wrong, correct solution would have been: " +
          questions[0].validOptions.map(option => option)
      });
    }
    if (
      questions[1].validOptions.length === selectedOption2.length &&
      questions[1].validOptions.every(
        (value, index) => value === selectedOption2[index]
      )
    ) {
    } else {
      this.setState({
        errorText2:
          "Wrong, correct solution would have been: " +
          questions[1].validOptions.map(option => option)
      });
    }
    if (
      questions[2].validOptions.length === selectedOption3.length &&
      questions[2].validOptions.every(
        (value, index) => value === selectedOption3[index]
      )
    ) {
    } else {
      this.setState({
        errorText3:
          "Wrong, correct solution would have been: " +
          questions[2].validOptions.map(option => option)
      });
    }
  }

  render() {
    const { ID } = this.props.location.state;
    const {
      selectedOption1,
      selectedOption2,
      selectedOption3,
      errorText1,
      errorText2,
      errorText3,
      questions
    } = this.state;

    return (
      <div className="MatchTheLicense">
        <SideNavigation ID={ID} />
        <div className="pagecontent">
          <h1>Match the License</h1>
          <div>
            <div>{questions.length > 0 && questions[0].text}</div>
            <div className="errorMessage">{errorText1}</div>
            <Select
              value={selectedOption1}
              onChange={ev => this.handleChange("selectedOption1", ev)}
              options={options}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              isSearchable={false}
            />
            <div>{questions.length > 0 && questions[1].text}</div>
            <div className="errorMessage">{errorText2}</div>
            <Select
              value={selectedOption2}
              onChange={ev => this.handleChange("selectedOption2", ev)}
              options={options}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              isSearchable={false}
            />
            <div>{questions.length > 0 && questions[2].text}</div>
            <div className="errorMessage">{errorText3}</div>
            <Select
              value={selectedOption3}
              onChange={ev => this.handleChange("selectedOption3", ev)}
              options={options}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              isSearchable={false}
            />
          </div>
          <button onClick={() => this.validate()}>Check</button>
        </div>
        <div className="buttoncontainer">
          <BackButtonInactive />
          <ForthButton nextText={this.redirectToNextPage} />
        </div>
      </div>
    );
  }
}

export default withRouter(MatchTheLicense);

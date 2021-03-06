import React, { Component } from "react";
import SideNavigation from "../components/SideNavigation";
import { withRouter } from "react-router";
import data from "../data.json";
import BackButton from "../components/BackButton";
import ForthButton from "../components/ForthButton";
import SettingsButton from "../components/SettingsButton";
import QuizQuestion from "./../components/game/QuizQuestion";
import SpeechBubbleContainer from "./../components/SpeechBubbleContainer";

const options = [
  {
    "id": 1,
    "choice": "Edit and print the image on a flyer for a public event. Don’t mention the author and source. "
  },
  {
    "id": 2,
    "choice": "Print the image on a shirt and give it to a friend as a present."
  },
  {
    "id": 3,
    "choice": "Sell the image on a website as a wallpaper." },
  {
    "id": 4,
    "choice": "Use the image as marketing material for a fitness studio."
  },
  {
    "id": 5,
    "choice": "Use the image as a profile picture on an online dating platform."
  },
  { "id": 6,
    "choice": "Use the image in a bachelor thesis without mentioning the author and source."
  },
  { "id": 7,
    "choice": "Print and use the image as a poster for a political party."
  },
  { "id": 8,
    "choice": "Edit the image and sell it as a postcard print without indicating the modification."
  },
  { "id": 9,
    "choice": "Use the image for a birthday invitation."
  }
];

class FindTheLicense extends Component {
  constructor(props) {
    super(props);
    this.child1 = React.createRef();
    this.child2 = React.createRef();
    this.child3 = React.createRef();
    this.child4 = React.createRef();
    this.child5 = React.createRef();
    this.child6 = React.createRef();
    this.child7 = React.createRef();
    this.child8 = React.createRef();
    this.child9 = React.createRef();
    this.state = {
      textIndex: 0,
      panels: [],
      headline: "",
      nextPageID: 0,
      nextPage: "",
      buttonClicked: false,
      correctAnswersText: ""
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.validate = this.validate.bind(this);
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
      panels: filteredJSON[0].panels,
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID
    });
  }

  nextText() {
    const { panels, textIndex } = this.state;
    const theSize = panels.length - 1;
    if (textIndex >= 0 && textIndex < theSize) {
      this.setState(prevState => {
        return { textIndex: prevState.textIndex + 1 };
      });
    }
    this.setState({ buttonClicked: false });
    this.setState({ correctAnswersText: "" });
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

  redirectToNextPage() {
    const { history } = this.props;
    const { nextPageID, nextPage } = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID }
    });
  }

  validate() {
    const { panels, textIndex } = this.state;

    this.child1.current.validate();
    this.child2.current.validate();
    this.child3.current.validate();
    this.child4.current.validate();
    this.child5.current.validate();
    this.child6.current.validate();
    this.child7.current.validate();
    this.child8.current.validate();
    this.child9.current.validate();
    this.setState({ buttonClicked: true });

    let answerText;
    if (panels[textIndex].correctAnswers.length === 1) {
      answerText = "The correct answer is: " + panels[textIndex].correctAnswers;
    } else {
      answerText =
        "The correct answers are: " + panels[textIndex].correctAnswers;
    }
    this.setState({ correctAnswersText: answerText });
  }

  render() {
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/"
      });
      return <div />;
    }
    const { ID } = this.props.location.state;
    const {
      panels,
      textIndex,
      headline,
      buttonClicked,
      correctAnswersText
    } = this.state;
    console.log(this.state.buttonClicked);

    return (
      <div className="FindTheLicense">
        <SideNavigation ID={ID} />
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="pagecontent">
          <h1>{headline}</h1>
          {panels[textIndex] && panels[textIndex].question !== undefined ? (
            <div>
              <div className="quizQuestions">
                <div className="quiz-topsection">
                  <div
                    className="question"
                    dangerouslySetInnerHTML={{
                      __html: panels[textIndex].question
                    }}
                  />
                  <p className={`correctAnswers ${buttonClicked ? "" : "disableAnswers"}`}> {correctAnswersText} </p>
                </div>
                <QuizQuestion
                  key={"question1" + textIndex}
                  ref={this.child1}
                  option={options[0]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <QuizQuestion
                  key={"question2" + textIndex}
                  ref={this.child2}
                  option={options[1]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <QuizQuestion
                  key={"question3" + textIndex}
                  ref={this.child3}
                  option={options[2]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <QuizQuestion
                  key={"question4" + textIndex}
                  ref={this.child4}
                  option={options[3]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <QuizQuestion
                  key={"question5" + textIndex}
                  ref={this.child5}
                  option={options[4]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <QuizQuestion
                  key={"question6" + textIndex}
                  ref={this.child6}
                  option={options[5]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <QuizQuestion
                  key={"question7" + textIndex}
                  ref={this.child7}
                  option={options[6]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <QuizQuestion
                  key={"question8" + textIndex}
                  ref={this.child8}
                  option={options[7]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <QuizQuestion
                  key={"question9" + textIndex}
                  ref={this.child9}
                  option={options[8]}
                  rightAnswers={panels[textIndex].correctAnswers}
                />
                <div className="center-btn-container">
                  <button className="quiz-btn" onClick={this.validate}>
                      Submit answers
                  </button>
                </div>
              </div>
              {textIndex + 1 < panels.length && buttonClicked === true ? (
                <div className="buttoncontainer col">
                  <BackButton previousText={this.previousText} />
                  <ForthButton nextText={this.nextText} />
                </div>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div>
              <SpeechBubbleContainer panels={panels} textIndex={textIndex} />
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
              ) : textIndex === panels.length - 1 ? (
                <div className="buttoncontainer col">
                  <BackButton previousText={this.previousText} />
                  <ForthButton nextText={this.redirectToNextPage} />
                </div>
              ) : (
                <div />
              )}
            </div>
          )}
          <p />
        </div>
      </div>
    );
  }
}

export default withRouter(FindTheLicense);

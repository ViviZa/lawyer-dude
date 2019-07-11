import React, { Component } from "react";
import { withRouter } from "react-router";
import SideNavigation from "../components/SideNavigation";
import data from "../data.json";
import BackButton from "../components/BackButton";
import BackButtonInactive from "../components/BackButtonInactive";
import ForthButton from "../components/ForthButton";
import QuizQuestion from "../components/game/QuizQuestion";
import SpeechBubbleContainer from "../components/SpeechBubbleContainer";
import SettingsButton from "../components/SettingsButton";

class JailGameOne extends Component {
  constructor(props) {
    super(props);
    this.child1 = React.createRef();
    this.child2 = React.createRef();
    this.child3 = React.createRef();
    this.child4 = React.createRef();
    this.child5 = React.createRef();
    this.state = {
      textIndex: 0,
      panels: [],
      headline: "",
      nextPageID: 0,
      nextPage: "",
      buttonClicked: false,
      correctAnswersText: ""
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props;
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

  validate() {
    const { panels, textIndex } = this.state;
    this.child1.current.validate();
    this.child2.current.validate();
    this.child3.current.validate();
    this.child4.current.validate();
    this.child5.current.validate();
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
    const {
      panels,
      textIndex,
      headline,
      buttonClicked,
      correctAnswersText
    } = this.state;
    const { cssGameClass, showNavigation, cssLaywerClass } = this.props;
    return (
      <div className={cssLaywerClass}>
        {showNavigation === true && <SideNavigation ID={1000} />}
        <SettingsButton goBack={() => this.props.history.goBack()} />
        {panels[textIndex] !== undefined &&
        panels[textIndex].question !== undefined ? (
          <div className={cssGameClass}>
            <h1>{headline}</h1>
            <div
              className="question"
              dangerouslySetInnerHTML={{ __html: panels[textIndex].question }}
            />
            <div className="quizQuestions">
                {correctAnswersText !== "" && <div className="correctAnswers">{correctAnswersText}</div>}
                <QuizQuestion key={"question1"+textIndex} ref={this.child1} option={panels[textIndex].choices[0]} rightAnswers={panels[textIndex].correctAnswers} />
                <QuizQuestion key={"question2"+textIndex}  ref={this.child2} option={panels[textIndex].choices[1]} rightAnswers={panels[textIndex].correctAnswers}/>
                <QuizQuestion key={"question3"+textIndex}  ref={this.child3} option={panels[textIndex].choices[2]} rightAnswers={panels[textIndex].correctAnswers}/>
                <QuizQuestion key={"question4"+textIndex}  ref={this.child4} option={panels[textIndex].choices[3]} rightAnswers={panels[textIndex].correctAnswers}/>
                <QuizQuestion key={"question5"+textIndex}  ref={this.child5} option={panels[textIndex].choices[4]} rightAnswers={panels[textIndex].correctAnswers}/>
                <div className="center-btn-container">
                  <button className="quiz-btn" onClick={this.validate}>Submit answers</button>
                </div>
            </div>
            {textIndex + 1 < panels.length && buttonClicked === true ? (
              <div className="buttoncontainer">
                <BackButton previousText={this.previousText} />
                <ForthButton nextText={this.nextText} />
              </div>
            ) : (
              <div />
            )}
          </div>
        ) : (
          <div>
            <SpeechBubbleContainer panels={panels} textIndex={textIndex} jail />
            {textIndex === 0 && panels.length > 1 ? (
              <div className="buttoncontainer">
                <BackButtonInactive />
                <ForthButton nextText={this.nextText} />
              </div>
            ) : textIndex === panels.length - 1 ? (
              <div className="buttoncontainer">
                <BackButton previousText={this.previousText} />
                <ForthButton nextText={() => this.props.history.goBack()} />
              </div>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(JailGameOne);

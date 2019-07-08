import React, { Component } from "react";
import { withRouter } from "react-router";
import HTML5Backend from "react-dnd-html5-backend";
import Box from "../components/game/Box";
import { DndProvider } from "react-dnd";
import AnswerContainer from "../components/game/AnswerContainer";
import update from "immutability-helper";
import BackButtonInactive from "../components/BackButtonInactive";
import ForthButton from "../components/ForthButton";
import data from "../data.json";
import BackButton from "./../components/BackButton";
import SpeechBubbleContainer from "../components/SpeechBubbleContainer";

class JailGameTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      answers: [
        {
          lastDroppedItem: null,
          accepts: "image",
          exercise: "BY (attribution)",
          errorText: ""
        },
        {
          lastDroppedItem: null,
          accepts: "image",
          exercise: "SA (share alike)",
          errorText: ""
        },
        {
          lastDroppedItem: null,
          accepts: "image",
          exercise: "ND (no derivatives)",
          errorText: ""
        },
        {
          lastDroppedItem: null,
          accepts: "image",
          exercise: "NC (non commercial)",
          errorText: ""
        }
      ],
      images: [],
      solution: [],
      textIndex: 0,
      panels: [],
      exitText: [],
      showExitText: false,
      cssClass : [],
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.validate = this.validate.bind(this);
    this.previousText = this.previousText.bind(this);
    this.nextText = this.nextText.bind(this);
    this.toggleExitText = this.toggleExitText.bind(this);  
  }

  componentDidMount() {
    const { ID } = this.props;
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    const nextPageID = filteredJSON[0].nextPageIDs[0];
    this.setState({
      panels: filteredJSON[0].panels,
      exitText: filteredJSON[0].exitTexts,
      headline: filteredJSON[0].headline,
      cssClass: filteredJSON[0].cssClass,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID,
      images: filteredJSON[0].images,
      solution: filteredJSON[0].solution
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

  handleDrop(index, item) {
    const { answers } = this.state;
    this.setState({
      answers: update(answers, {
        [index]: {
          lastDroppedItem: {
            $set: item
          }
        }
      })
    });
  }

  validate() {
    const { answers, solution } = this.state;
    answers.map((answer, index) =>
      answer.lastDroppedItem &&
      answer.lastDroppedItem.src === solution[index].src
        ? (answer.errorText = "")
        : (answer.errorText = `Wrong answer`)
    );
    this.setState({ answers, submit: true });
  }

  toggleExitText() {
    const {showExitText} = this.state;
    this.setState({showExitText: !showExitText});
  }

  renderGame() {
    const { answers, submit, images, cssClass } = this.state;
    return (
      <div className={cssClass[0]}>
      <div className="jailgametwo-container">
        <DndProvider backend={HTML5Backend}>
          <div className="jailgame-text">
            Drag and drop the correct icons to the license modules.
          </div>
          <div className="images-container">
            {images.map(({ src, type }, index) => (
              <Box src={src} type={type} key={index} />
            ))}
          </div>
          <div className="images-container">
            {answers.map(
              ({ accepts, lastDroppedItem, exercise, errorText }, index) => (
                <div key={index} className="answercontainer">
                  <AnswerContainer
                    accept={accepts}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={item => this.handleDrop(index, item)}
                    key={index}
                  />
                  <div>{exercise}</div>
                  {submit && errorText !== "" ? (
                    <div style={{ color: "red" }}>{errorText}</div>
                  ) : (
                    submit && (
                      <div style={{ color: "green" }}>Correct Answer!</div>
                    )
                  )}
                </div>
              )
            )}
          </div>
        </DndProvider>
        <button className="match-btn" onClick={() => this.validate()}>
          Submit answers
        </button>
        {submit && (
          <div className="buttoncontainer jail-button">
            <BackButtonInactive />
            <ForthButton nextText={() => this.toggleExitText()} />
          </div>
        )}
      </div>
      </div>
    );
  }

  render() {
    const { textIndex, panels, showExitText, exitText, cssClass } = this.state;
    const { showJail } = this.props;
    return (
      <div>
        { showExitText ? (
              <div className={cssClass[1]}>
                <div>
                  <SpeechBubbleContainer panels={exitText} textIndex={0} jail/>
                </div>
                <div className="buttoncontainer">
                  <BackButton previousText={this.toggleExitText} />
                  <ForthButton nextText={(() => this.props.history.goBack())} />
                </div>
              </div>
        ) : ( panels && textIndex === 0 && panels.length >= 1 ? (
          <div>
            <SpeechBubbleContainer panels={panels} textIndex={textIndex} jail/>
            <div className="buttoncontainer">
              <BackButton previousText={showJail} />
              <ForthButton nextText={this.nextText} />
            </div>
          </div>
        ) : panels && textIndex + 1 <= panels.length ? (
          <div  className={cssClass[1]}>
            <div>
              <SpeechBubbleContainer panels={panels} textIndex={textIndex} jail/>
            </div>
            <div className="buttoncontainer">
              <BackButton previousText={this.previousText} />
              <ForthButton nextText={this.nextText} />
            </div>
          </div>
        ) : (
          this.renderGame()
        ))}
      </div>
    );
  }
}

export default withRouter(JailGameTwo);

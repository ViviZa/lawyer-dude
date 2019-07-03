import React, { Component } from "react";
import { withRouter } from "react-router";
import HTML5Backend from "react-dnd-html5-backend";
import Box from "./Box";
import { DndProvider } from "react-dnd";
import AnswerContainer from "./AnswerContainer";
import update from "immutability-helper";
import BackButtonInactive from "../../components/BackButtonInactive";
import ForthButton from "../../components/ForthButton";

const images = [
  { src: "images/Cc-nd.svg", type: "image", name: "CC-ND" },
  { src: "images/Cc-by.svg", type: "image", name: "CC-BY" },
  { src: "images/Cc-sa.svg", type: "image", name: "CC-SA" },
  { src: "images/Cc-nc.svg", type: "image", name: "CC-NC" }
];

const solution = [
  { src: "images/Cc-by.svg", name: "CC-BY" },
  { src: "images/Cc-sa.svg", name: "CC-SA" },
  { src: "images/Cc-nd.svg", name: "CC-ND" },
  { src: "images/Cc-nc.svg", name: "CC-NC" }
];

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
      ]
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.validate = this.validate.bind(this);
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
    const { answers } = this.state;
    answers.map((answer, index) =>
      answer.lastDroppedItem && answer.lastDroppedItem.src === solution[index].src
        ? (answer.errorText = "")
        : (answer.errorText = `Wrong answer`)
    );
    this.setState({ answers, submit: true });
  }

  render() {
    const { answers, submit } = this.state;
    return (
      <div class="jailgametwo-container">
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
            <ForthButton nextText={() => this.props.history.goBack()} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(JailGameTwo);

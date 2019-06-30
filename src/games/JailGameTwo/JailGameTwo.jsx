import React, { Component } from "react";
import { withRouter } from "react-router";
import HTML5Backend from "react-dnd-html5-backend";
import Box from "./Box";
import { DndProvider } from "react-dnd";
import AnswerContainer from "./AnswerContainer";
import update from "immutability-helper";

const images = [
  { src: "images/Cc-nd.svg", type: "image", name: "CC-ND" },
  { src: "images/Cc-by.svg", type: "image", name: "CC-BY" },
  { src: "images/Cc-sa.svg", type: "image", name: "CC-SA" }
];

const solution = [
  { src: "images/Cc-by.svg", name: "CC-BY" },
  { src: "images/Cc-sa.svg", name: "CC-SA" },
  { src: "images/Cc-nd.svg", name: "CC-ND" }
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
      answer.lastDroppedItem.src === solution[index].src
        ? (answer.errorText = "")
        : (answer.errorText = `Wrong answer, the correct solution would have been ${
            solution[index].name
          }`)
    );
    this.setState({ answers , submit: true});
  }

  render() {
    const { answers, submit } = this.state;
    return (
      <div>
        <DndProvider backend={HTML5Backend}>
          <div style={{ overflow: "hidden", clear: "both" }}>
            {answers.map(
              ({ accepts, lastDroppedItem, exercise, errorText }, index) => (
                <div key={index}>
                  <AnswerContainer
                    accept={accepts}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={item => this.handleDrop(index, item)}
                    key={index}
                  />
                  <div>{exercise}</div>
                  {
                    (submit && errorText !== "") ? (
                      <div style={{ color: "red" }}>{errorText}</div>
                    ) : (
                      submit && <div style={{ color: "green" }}>Correct Answer!</div>
                    )
                  }
                </div>
              )
            )}
          </div>

          <div style={{ overflow: "hidden", clear: "both" }}>
            {images.map(({ src, type }, index) => (
              <Box src={src} type={type} key={index} />
            ))}
          </div>
        </DndProvider>
        <button className="match-btn" onClick={() => this.validate()}>
          Submit answers
        </button>
      </div>
    );
  }
}

export default withRouter(JailGameTwo);

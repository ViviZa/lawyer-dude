import React, { Component } from "react";
import { withRouter } from "react-router";
import HTML5Backend from "react-dnd-html5-backend";
import Box from "./Box";
import { DndProvider } from "react-dnd";
import AnswerContainer from "./AnswerContainer";
import update from "immutability-helper";

const images = [
  { src: "images/Cc-nd.svg", type: "image" },
  { src: "images/Cc-by.svg", type: "image" }
];

const solution = ["images/Cc-by.svg", "images/Cc-nd.svg"];

class JailGameTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [
        {
          lastDroppedItem: null,
          accepts: "image",
          exercise: "BY (attribution)"
        },
        {
          lastDroppedItem: null,
          accepts: "image",
          exercise: "SA (share alike)"
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
    const enteredAnwers = answers.map(answer => answer.lastDroppedItem.src);
    console.log(
      enteredAnwers.length === solution.length &&
        enteredAnwers.every(function(value, index) {
          return value === solution[index];
        })
    );
  }

  render() {
    const { answers } = this.state;
    return (
      <div>
        <DndProvider backend={HTML5Backend}>
          <div style={{ overflow: "hidden", clear: "both" }}>
            {answers.map(({ accepts, lastDroppedItem, exercise }, index) => (
              <div>
                <AnswerContainer
                  accept={accepts}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={item => this.handleDrop(index, item)}
                  key={index}
                />
                <div>{exercise}</div>
              </div>
            ))}
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

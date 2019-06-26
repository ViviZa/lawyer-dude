import React, { Component } from 'react';


class Question extends Component {
    constructor(props){
      super(props);
      this.state = {
        color : "#e1e1e1",
        isChecked : false,
        isChosenCorrectly : false,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.validate = this.validate.bind(this);
  }

  validate() {
    const {rightAnswers, id} = this.props;
    if(!rightAnswers.includes(id) && this.state.isChecked === true ) {
      this.setState({ color : "#F26D75" });
    }else if (rightAnswers.includes(id) && this.state.isChecked===false){
      this.setState({ color : "#F26D75" });
    } else{
      this.setState({ color : "#69BFAF" });
    }
  }

  handleInputChange() {
    const boolVal = !this.state.isChecked;
    this.setState({ isChecked : boolVal});
  }

    render(){
      const { isChecked, color } = this.state; 
      let textYouAreWrong;
      // if (color === "#F26D75") {
      //   textYouAreWrong = <p className="wrong"> Oh Wrong answer</p>
      // }
        return (
            <div className="quizQuestion" style={{background: color}}>
                <label className="choice">
                <input
                  name="isChecked"
                  type="checkbox"
                  checked={isChecked.active}
                  onChange={this.handleInputChange}
                  id={this.props.id} />
                  {this.props.choice}
              </label>
              {textYouAreWrong}
            </div>
        )
    }
}

export default Question;
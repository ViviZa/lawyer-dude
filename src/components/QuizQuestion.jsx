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
    const {rightAnswers, option} = this.props;
    if(!rightAnswers.includes(option.id) && this.state.isChecked === true ) {
      this.setState({ color : "#F26D75" });
    }else if (rightAnswers.includes(option.id) && this.state.isChecked===false){
      this.setState({ color : "#F26D75" });
    } else {
      this.setState({ color : "#69BFAF"});
      this.setState({ validationText : "" });
    }
  }

  handleInputChange() {
    const boolVal = !this.state.isChecked;
    this.setState({ isChecked : boolVal});
  }

    render(){
      const { isChecked, color } = this.state;
        return (
            <div className="quizQuestion" style={{background: color}}>
                <label className="choice">
                {this.props.option.id}
                <input
                  name="isChecked"
                  type="checkbox"
                  checked={isChecked.active}
                  onChange={this.handleInputChange}
                  id={this.props.option.id}
                  />
                  {this.props.option.choice}
              </label>
            </div>
        )
    }
}

export default Question;
import React, { Component } from 'react';


class Question extends Component {
    constructor(props){
      super(props);
      this.state = {
        color : "white",
        isChecked : false,
      };
     // this.handleInputChange = this.handleInputChange.bind(this);
  }

    render(){
        return (
            <div style={{background: this.state.color}}>
                <label className="choice">
                <input
                  name="isChecked"
                  type="checkbox"
                  //checked={this.state.isChecked}
                  //onChange={this.props.handleInputChange}
                  id={this.props.id} />
                  {this.props.choice}
              </label>
            </div>
        )
    }
}

export default Question;
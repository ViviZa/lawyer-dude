import React, { Component } from 'react';


class Question extends Component {
    constructor(props){
      super(props);
      this.state = {
        color : "white",
        isChecked : false,
      };
  }

    render(){
      const { isChecked } = this.state; 
        return (
            <div style={{background: this.state.color}}>
                <label className="choice">
                <input
                  name="isChecked"
                  type="checkbox"
                  checked={isChecked.active}
                  onChange={this.props.handleInputChange}
                  id={this.props.id} />
                  {this.props.choice}
              </label>
            </div>
        )
    }
}

export default Question;
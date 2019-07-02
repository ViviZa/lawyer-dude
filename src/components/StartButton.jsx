import React, { Component } from 'react';

class StartButton extends Component {

    render(){
        const {nextText} = this.props;
        return (
            <button onClick={nextText} className="StartButton">
            Get started
            </button>
        )
    }
}

export default StartButton;
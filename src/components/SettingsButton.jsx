import { ReactComponent as Settings } from '../images/settings.svg';

import React, { Component } from 'react';

class SettingsButton extends Component {
    constructor(props) {
        super(props);    
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        //show overlay
    }

    render(){
        return (
            <button onClick={this.handleClick} className="SettingsButton">
                <Settings/>
            </button>
        )
    }
}

export default SettingsButton;
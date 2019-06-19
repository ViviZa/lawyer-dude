import { ReactComponent as Settings } from '../images/settings.svg';

import React, { Component } from 'react';
import SettingsOverlay from './SettingsOverlay';

class SettingsButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false
         }   
        this.showOverlay = this.showOverlay.bind(this);
        this.hideOverlay = this.hideOverlay.bind(this);
    }
    
    showOverlay() {
        this.setState({ show: true });
    }


    hideOverlay = () => {
        this.setState({ show: false });
    };

    render(){
        return (
            <div>
                <SettingsOverlay show={this.state.show} handleClose={this.hideOverlay} goBack={this.props.goBack}/>
                <button onClick={this.showOverlay} className="SettingsButton">
                    <Settings className="settings-svg"/>
                </button>
            </div>
        )
    }
}

export default SettingsButton;
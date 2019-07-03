import React, { Component } from 'react';

class SettingsOverlay extends Component {

    render(){
        const showHideClassName = this.props.show ? "overlay-shown" : "overlay-hidden";
        return (
                <div className={showHideClassName}>
                    <div className="Overlay">
                        <button className="button-close-overlay" onClick={this.props.handleClose}>X</button>
                        <h2>Settings</h2>
                        <ul>
                        <li><a href="/">Start from beginning</a></li>
                        <li><a href="/imprint" className="settings">Imprint and Disclaimer</a></li>
                        <li>Switch language: en | de </li>
                        </ul>
                    </div>
                </div>
        ) 
    }
}

export default SettingsOverlay;
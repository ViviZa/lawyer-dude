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
                            <li><button onClick={this.props.goBack}>Go back to previous page</button></li>
                            <li><a href="/">Start from beginning</a></li>
                            <li><a href="/impressum">About</a></li>
                            <li>Switch language: <a>en </a> |<a> de </a></li>
                        </ul>
                    </div>
                </div>
        ) 
    }
}

export default SettingsOverlay;
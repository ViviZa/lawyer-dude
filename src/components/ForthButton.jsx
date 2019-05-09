import React, { Component } from 'react';

class ForthButton extends Component {

    render(){
        const {nextText} = this.props;
        return (
            <button onClick={nextText} className="ForthButton">
            <svg width="21px" height="35px" viewBox="0 0 21 35" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Enter-your-name_v2" transform="translate(-876.000000, -904.000000)" stroke="#FFFFFF" stroke-width="3">
                        <g id="next_btn" transform="translate(851.000000, 888.000000)">
                            <polyline id="Path" transform="translate(35.000000, 33.500000) rotate(-270.000000) translate(-35.000000, -33.500000) " points="19 42 35 25 35 25 51 42"></polyline>
                        </g>
                    </g>
                </g>
            </svg>
          </button>
        )
    }
}

export default ForthButton;
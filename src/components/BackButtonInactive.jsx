import React, { Component } from 'react';

class BackButtonInactive extends Component {

    render(){
        return (
            <button className="btn_inactive">
            <svg width="21px" height="36px" viewBox="0 0 21 36" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Enter-your-name_v2" transform="translate(-787.000000, -903.000000)" stroke="#FFFFFF" stroke-width="3">
                        <g id="next_btn" transform="translate(767.000000, 888.000000)">
                            <polyline id="Path" transform="translate(31.500000, 33.000000) scale(-1, 1) rotate(-270.000000) translate(-31.500000, -33.000000) " points="15.5 41.5 31.5 24.5 31.5 24.5 47.5 41.5"></polyline>
                        </g>
                    </g>
                </g>
            </svg>
          </button>
        )
    }
}

export default BackButtonInactive;
import React, { Component } from 'react';
import '../styles/style.css';


class SideNavigation extends Component {
  render() {
    return (
      <div className="SideNavigation">
        <div className="logo-box"></div>
        <div className="nav-container">
          <ul>
            <li><a href="#startpage">Startpage</a></li>
            <li><a href="#storypage">Storypage</a></li>
            <li><a href="#decisionpage">Decisionpage</a></li>
          </ul>
        </div>         
      </div>
    );
  }
}

export default SideNavigation;

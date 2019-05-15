import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


class SideNavigation extends Component {
  burgerToggle() {
    var linksEl = document.querySelector('.narrowLinks');
    var sideNavigation = document.querySelector('.SideNavigation')
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
      sideNavigation.style.width = '6%';
    } 
    else {
      linksEl.style.display = 'block';
      sideNavigation.style.width = '15%';
    }
}
  
  render() {
    return (
      <nav>
      <div className="SideNavigation">
        <div className="logo-box"></div>
        <div className="navWide">
        <div className="wideDiv">
        <ul>
          <li><Link to="/">Startpage</Link></li>
          <li><Link to="/learninggoals">Learning Goals</Link></li>
          <li><Link to="/entername">Enter Name</Link></li>
          <li><Link to="/story">Storypage</Link></li>
          <li><Link to="/decision">Decisionpage</Link></li>
        </ul>
        </div>         
      </div>
      <div className="navNarrow">
      <i><FontAwesomeIcon icon="bars" size='lg' onClick={this.burgerToggle}/></i>
        <div className="narrowLinks">
        <ul>
          <li><a href="#startpage" onClick={this.burgerToggle} >Startpage</a></li>
          <li><a href="#storypage" onClick={this.burgerToggle}>Storypage</a></li>
          <li><a href="#decisionpage" onClick={this.burgerToggle}>Decisionpage</a></li>
        </ul>
        </div>         
      </div>
      </div>
      </nav>
    );
  }
}

export default SideNavigation;

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/style.css';
import { Link } from 'react-router-dom';
import data from '../data.json';
import { withRouter } from 'react-router';

class SideNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedPages: [],
    };
  }

  componentDidMount(){
    const {ID} = this.props;
    let visitedPages = JSON.parse(localStorage.getItem('visitedPages'));
    const dataString = JSON.stringify(data);
    const jsonData = JSON.parse(dataString);
    let filteredJSON = jsonData.filter(values => visitedPages.includes(values.id));
    let nextPageIDs = [];
    for (let [index, val] of filteredJSON.entries()) {
      if(Array.isArray(val.nextPageIDs)){
        if (val.nextPageIDs.includes(ID)){
          nextPageIDs.push( index+1);
        }
      } else {
        if (val.nextPageIDs === ID){
          nextPageIDs.push( index+1);
        }
      }    
  }
    const visitedNextPage = filteredJSON.filter(value => value.id === ID );
    if (visitedNextPage.length > 0){
      filteredJSON.length = nextPageIDs;
      visitedPages.length = nextPageIDs;
      localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    }
   
    const currentPage = jsonData.filter(values => values.id === ID);
    filteredJSON.push(currentPage[0]);
    this.setState({visitedPages: filteredJSON});
  }

  redirectToNextPage(url, id) {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { ID: id },
    });
  }

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
    const {visitedPages} = this.state;
    return (
      <nav>
      <div className="SideNavigation">
        <div className="logo-box"></div>
        <div className="navWide">
        <div className="wideDiv">
        <ul>
          {
            visitedPages.map( page => {
              return (
                <li> 
                  <Link
                   to={{
                    pathname: page.pageurl,
                    state: { ID:  page.id }}}
                  >
                {page.headline}
                </Link>
                </li>
              )
            })
          }
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

export default withRouter(SideNavigation);

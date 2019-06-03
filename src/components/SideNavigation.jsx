import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as LDicon } from '../images/Lawyerdude-head-icon.svg';
import { Link } from 'react-router-dom';
import data from '../data.json';
import { withRouter } from 'react-router';

class SideNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedPages: [],
    };

    this.highlightedLink = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount(){
    const {ID} = this.props;
    let visitedPages = JSON.parse(localStorage.getItem('visitedPages'));
    const dataString = JSON.stringify(data);
    const jsonData = JSON.parse(dataString);
    const ids = visitedPages.map(page => page.id);
    const filteredJSON = jsonData.filter(values => ids.includes(values.id));

    let nextPageIDs = 0;
    for (let [index, val] of visitedPages.entries()) {
      if(Array.isArray(val.nextPageIDs)){
        if (val.nextPageIDs.includes(ID)){
          nextPageIDs = index+1;
        }
      } else {
        if (val.nextPageIDs === ID){
          nextPageIDs= index+1;
        }
      }    
  }
    const visitedNextPage = filteredJSON.filter(value => value.nextPageIDs.includes( ID) );
    if (visitedNextPage.length > 0 &&  !ids.includes(ID)){
      visitedPages.length = nextPageIDs;
    }
   
    if(!ids.includes(ID)){
      const currentPage = jsonData.filter(values => values.id === ID);
      visitedPages.push(currentPage[0]);
    }
    this.setState({visitedPages: visitedPages});
    localStorage.setItem('visitedPages', JSON.stringify(visitedPages));

    if(this.highlightedLink.current){
      this.scrollToBottom();
    }
  }

  componentDidUpdate(){
    if(this.highlightedLink.current !== null){
      this.scrollToBottom(this.highlightedLink.current);
    }
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

scrollToBottom(highlightedLink) {
  highlightedLink.scrollIntoView();
}
  
  render() {
    const {ID} = this.props;
    const {visitedPages} = this.state;
    return (
      <nav>
      <div className="SideNavigation">
        <div className="logo-box">
            <LDicon className="lawyericon"/>
        </div>
        <div className="navWide">
        <div className="wideDiv">
        <ul>
          {
            visitedPages.map( page => {
              return (
                <li
                  key={page.id}
                > 
                  <Link
                    className={page.id === ID ? 'highlightedLink' : 'sideNavigationLink'}
                    to={{
                      pathname: page.pageurl,
                      state: { ID:  page.id }
                    }}
                    >
                      <div 
                    ref={page.id === ID ? this.highlightedLink : ''}
                      />
                    {page.headline}
                  </Link>
                </li>
              )
            })
          }
            <li>
              <Link 
                className="disabledLink"
                to={""}
                onClick={e => e.preventDefault()}
              >
                  Unlock more chapters!
              </Link>
            </li>
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

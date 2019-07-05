import React, { Component } from 'react';
import { withRouter } from 'react-router';
import data from '../data.json';
import SettingsButton from '../components/SettingsButton.jsx';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: '',
      resources: [],
      toc: '',
      content: '',
    };

    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    localStorage.removeItem('visitedPages');
    localStorage.setItem('visitedPages', JSON.stringify(filteredJSON));

    let toc = '';
    let content = '';
    let anchorId = 0;
    jsonData.forEach(obj => {
      let added = false;
      let headline = '';
      let images = '';
      let text = '';
      if(obj.panels !== undefined){
        obj.panels.forEach(panel => {
          if(panel.type === 'resource'){
            headline = obj.headline;
            if(!added) {
              toc += "<div classname='resourceTOC'><a href='/resources#" + anchorId + "' >" + headline + "</a></div>";
              added = true;
            }
            text += panel.text;
            if(panel.images !== undefined){
              images = "<div className='resImages'>";
              panel.images.forEach(image => {
                images += "<img src='" + image + "' />";
              });
              images += "</div>";
            }
            text += images;
          }
        });
        if(headline !== '' ) content += "<div className='contentHeadline'><h3 id=" + anchorId + ">" + headline + "</h3></div><div className='contentText'>" + text + "</div>";
      }
      anchorId++;
    });
    
    this.setState({
      headline: filteredJSON[0].headline,
      toc: toc,
      content: content,
    })
  }
  
  redirectToNextPage(index) {
    const { history } = this.props;
    const { nextPageIDs, nextPages } = this.state;
    
    history.push({
      pathname: nextPages[index],
      state: { ID: nextPageIDs[index] },
    });
  }
  
  render() {
    const { headline, toc, content } = this.state;
    const topBtn = (<a href="/resources#top" className="top-btn" title="Go to top">Top</a>)

    return (
      <div className="Resources">
        {topBtn}
        <div id="top" className="topBar">
          <SettingsButton goBack={() => this.props.history.goBack()} />
          <button className="jail-back-btn" onClick={() => this.props.history.goBack()}> 
            Back to overview
          </button>
        </div>
        <div className="pagecontent">

          <h1 className="headline">{headline}</h1>
          <div className="container">
            <div className="resToC" dangerouslySetInnerHTML={{ __html: toc }} />
            <div className="resContent" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Resources);

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
    // this.resources(jsonData);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    localStorage.removeItem('visitedPages');
    localStorage.setItem('visitedPages', JSON.stringify(filteredJSON));

    let resources = [];
    jsonData.forEach(obj => {
      let added = false;
      if(obj.panels !== undefined){
        obj.panels.forEach(panel => {
          if(panel.type === 'resource' & !added){ 
            resources.push(obj);
            added = true;
          }
        });
      }
    });
    let toc = '';
    let content = '';
    let anchorId = 0;
    resources.forEach ( resource => {
      let headline = resource.headline; 
      toc += "<div classname='resourceTOCr'><a href='/resources#" + anchorId + "' >" + headline + "</a></div>"
      let text = '';
      resource.panels.forEach (panel => {
        if(panel.type === 'resource'){ 
          text += panel.text;
        }
      })
      content += "<div className='contentHeadline'><h3 id=" + anchorId + ">" + headline + "</h3></div><div className='contentText'>" + text + "</div>";
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
    return (
      <div className="Resources">
        <div className="topBar">
          <SettingsButton goBack={() => this.props.history.goBack()} />
          <button className="jail-back-btn" onClick={() => this.props.history.goBack()}> 
            Back to overview
          </button>
        </div>
        <div className="pagecontent   ">
          <h1 className="headline">{headline}</h1>
          <div className="container">
            <div className="resGlossar" dangerouslySetInnerHTML={{ __html: toc }} />
            <div className="resContent" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Resources);

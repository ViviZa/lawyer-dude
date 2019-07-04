import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import data from '../data.json';
import SettingsButton from '../components/SettingsButton.jsx';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: '',
      resources: [],
      glossar: '',
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
      if(obj.panels !== undefined){
        obj.panels.forEach(panel => {
          if(panel.type === 'resource') resources.push(obj);
        });
      }
    });
    let glossar = '';
    let content = '';
    resources.forEach ( resource => {
      let headline = resource.headline;
      glossar += "<div classname='resourceGlossar'><Link to='#" + headline + "'>" + headline + "</Link></div>"  
      // let text = resource.text;
      // content += "<div className='contentHeadline'><h2 id=" + headline + ">" + headline + "</h2></div><div className='contentText'>" + text + "</div>";
    });
    
    this.setState({
      headline: filteredJSON[0].headline,
      glossar: glossar,
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
    const { headline, glossar, content } = this.state;
    console.log(glossar);
    return (
      <div className="Resources">
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <button className="jail-back-btn" onClick={() => this.props.history.goBack()}> 
          Back to overview
        </button>
        <div className="pagecontent   ">
          <h1 className="headline">{headline}</h1>
          <div className="container">
          <div dangerouslySetInnerHTML={{ __html: glossar }} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Resources);

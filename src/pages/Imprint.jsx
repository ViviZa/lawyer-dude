import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SideNavigation from "../components/SideNavigation";
import SettingsButton from "../components/SettingsButton";
import imprintData from './ImprintData.json';

class Imprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentBlock: '',
    };
  }

  componentDidMount() {
    const dataString = JSON.stringify(imprintData);
    let jsonData = JSON.parse(dataString);
    this.createContentBlock(jsonData);
    console.log(this.state.contentBlock);
  }

  createContentBlock(jsonData) {
    let content = '';
    for (let i = 0; i < jsonData.length; i++) {
      let headline = jsonData[i].headline;
      let text = jsonData[i].text;
      content += "<div class='contentHeadline'><h2>" + headline + "</h2></div><div class='contentText'>" + text + "</div>";
    }
    this.setState({ contentBlock: content });
  }

  render() {
    const { contentBlock } = this.state;

    return (
      <div className="Imprint">
        <div id="top" className="topBar">
          <SettingsButton goBack={() => this.props.history.goBack()} />
          <button className="jail-back-btn" onClick={() => this.props.history.goBack()}>
            RETURN
          </button>
        </div>
        <div className="pagecontent">
          <div dangerouslySetInnerHTML={{ __html: contentBlock }} />
          <p></p>
        </div>
      </div>
    );
  }
}
export default withRouter(Imprint);
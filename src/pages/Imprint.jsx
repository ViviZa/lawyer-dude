import React, { Component } from 'react';
import { withRouter } from 'react-router';
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
      content += "<div><div class='contentHeadline'><h2>" + headline + "</h2><div class='contentText'>" + text + "</div></div></div>";
    }
    this.setState({ contentBlock: content });
  }

  render() {
    const { contentBlock } = this.state;

    return (
      <div className="Imprint">
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <button onClick={() => this.props.history.goBack()}>
          <svg width="21px" height="36px" viewBox="0 0 21 36" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Enter-your-name_v2" transform="translate(-787.000000, -903.000000)" stroke="#FFFFFF" strokeWidth="3">
                <g id="next_btn" transform="translate(767.000000, 888.000000)">
                  <polyline id="Path" transform="translate(31.500000, 33.000000) scale(-1, 1) rotate(-270.000000) translate(-31.500000, -33.000000) " points="15.5 41.5 31.5 24.5 31.5 24.5 47.5 41.5"></polyline>
                </g>
              </g>
            </g>
          </svg>
          Return
          </button>
        <div className="pagecontent">
          <div dangerouslySetInnerHTML={{ __html: contentBlock }} />
          <p></p>
        </div>
      </div>
    );
  }
}
export default withRouter(Imprint);
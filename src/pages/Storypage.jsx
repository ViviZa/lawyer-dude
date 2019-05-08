import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
import data from './Story.json';
import defaultImg from './index.png';
import { withRouter } from 'react-router';

class Storypage extends Component {
   constructor(props) {
      super(props);
      this.state = {
        username: '',
        textIndex: 0,
        panels: [],
        headline: ''
      };
      this.nextText = this.nextText.bind(this);
      this.previousText = this.previousText.bind(this);
    }

    componentDidMount(){
        const dataString = JSON.stringify(data);
        let jsonData = JSON.parse(dataString);
        console.log(jsonData);
        this.setState({
            panels: jsonData[0].panels,
            headline: jsonData[0].headline
        })
    }

     nextText() {
        const {panels, textIndex} = this.state
        const theSize = panels.length-1;
        if(textIndex >= 0 && textIndex < theSize){
        this.state.textIndex++;
        this.setState({textIndex: this.state.textIndex});
        }
    }

      previousText() {
        const theSize = this.state.panels.length-1;
        if(this.state.textIndex > 0 && this.state.textIndex <= theSize){
            this.state.textIndex--;
            this.setState({textIndex: this.state.textIndex});
        }
      }

      redirectPage(pageName){
        const {history} = this.props;
        history.push("/" + pageName);
    }

  render() {
    const {headline, panels} = this.state;
    return (
     <div className="Storypage">
      <SideNavigation/>
      <div className="pagecontent">
        <div className="info-section">
            <img src={defaultImg} className="defaultImg" alt="logo" />
            <p>
            {panels[this.state.textIndex]}
            </p>
       </div>
        <button onClick={this.previousText} className="BackButton">
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
        <button onClick={this.nextText} className="ForthButton">
            <svg width="21px" height="35px" viewBox="0 0 21 35" version="1.1">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Enter-your-name_v2" transform="translate(-876.000000, -904.000000)" stroke="#FFFFFF" stroke-width="3">
                      <g id="next_btn" transform="translate(851.000000, 888.000000)">
                          <polyline id="Path" transform="translate(35.000000, 33.500000) rotate(-270.000000) translate(-35.000000, -33.500000) " points="19 42 35 25 35 25 51 42"></polyline>
                      </g>
                  </g>
              </g>
            </svg>
       </button>
        <p></p>
        <button onClick={() => this.redirectPage("")}>
            go back
        </button>
        <button onClick={() => this.redirectPage("decision")}>
            go forward
        </button>
      </div>
    </div>
    );
  }
}

export default withRouter(Storypage);

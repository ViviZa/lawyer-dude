import React, { Component } from 'react';
import data from '../data.json';
import { withRouter } from 'react-router';
import { ReactComponent as LDHeadSceptical } from '../images/Lawyerdude-head-sceptical.svg';
import JailGameTwo from '../games/JailGameTwo/JailGameTwo.jsx';


class Jailpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      panels: [],
      headline: '',
      nextPageID: 0,
      nextPage: '',
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push({
        pathname: "/",
      });
      return <div/>;
    }
    const { ID } = this.props.location.state;
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    const nextPageID = filteredJSON[0].nextPageIDs[0];
    this.setState({
      panels: filteredJSON[0].panels,
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID,
    })
  }

  handleSubmit(event) {
    this.props.setUserName(this.state.username);
    this.props.goToNextPage(this.props.nextPage);
    event.preventDefault();
  }

  nextText() {
    const { panels, textIndex } = this.state
    const theSize = panels.length - 1;
    if (textIndex >= 0 && textIndex < theSize) {
      this.setState(prevState => {
        return {textIndex: prevState.textIndex + 1}
     })
    }
  }

  redirectToNextPage() {
    const { history } = this.props;
    const { nextPageID, nextPage } = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID },
    });
  }

  previousText() {
    const theSize = this.state.panels.length - 1;
    if (this.state.textIndex > 0 && this.state.textIndex <= theSize) {
      this.setState(prevState => {
        return {textIndex: prevState.textIndex - 1}
     })
    }
  }
  
  render() {
    const { ID } = this.props.location.state;
    const { panels, textIndex, headline } = this.state;
    return (
      <div className="Jailpage">
        <div className="jailpagecontent">
          <button className="jail-back-btn"onClick={() => this.props.history.goBack()}> 
            <svg id="back-arrow" width="21px" height="36px" viewBox="0 0 21 36" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-787.000000, -903.000000)" stroke="#FFFFFF" strokeWidth="3">
                        <g transform="translate(767.000000, 888.000000)">
                            <polyline transform="translate(31.500000, 33.000000) scale(-1, 1) rotate(-270.000000) translate(-31.500000, -33.000000) " points="15.5 41.5 31.5 24.5 31.5 24.5 47.5 41.5"></polyline>
                        </g>
                    </g>
                </g>
            </svg> 
            GO BACK AND TRY AGAIN
          </button>
          <div className="jail-speech">
            <p className="speechbubbletext-jail">
              <div dangerouslySetInnerHTML={{ __html: panels[textIndex]}}/>
            </p>
          </div>
          <JailGameTwo />
          <div className="speechlawyer-sceptical-container">
            <LDHeadSceptical className="speechlawyer-sceptical"/>
          </div>
        {/*
          {
            (textIndex === 0 && panels.length > 1) ? (
              <div>
                <ForthButton nextText={this.nextText} />
              </div>
            ) : (
                textIndex + 1 < panels.length ? (
                  <div>
                    <BackButton previousText={this.previousText} />
                    <ForthButton nextText={this.nextText} />
                  </div>
                ) : (
                    <div>
                      <ForthButton nextText={this.redirectToNextPage} />
                    </div>
                  ))
          }
          */}
          </div>
      </div>
    );
  }
}

export default withRouter(Jailpage);

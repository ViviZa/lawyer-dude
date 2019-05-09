import React, { Component } from 'react';
import SideNavigation from '../../components/SideNavigation';
import '../../styles/style.css';
import { withRouter } from 'react-router';
import data from './LearningGoals.json';
import BackButton from '../../components/BackButton';
import ForthButton from '../../components/ForthButton';

class LearningGoals extends Component {
 constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      panels: [],
      headline: ''
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount(){
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    this.setState({
      panels: jsonData[0].panels,
      headline: jsonData[0].headline
    })
  }

  redirectToNextPage(){
    const {history} = this.props;
    history.push("/entername");
  }

  handleSubmit(event) {
    this.props.setUserName(this.state.username);
    this.props.goToNextPage(this.props.nextPage);
    event.preventDefault();
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

  render() {
    const {panels, textIndex, headline} = this.state;

    return (
      <div className="Startpage">
        <SideNavigation/>
        <div className="pagecontent">
          <h1>
              {headline}
          </h1>
            <p>
              {panels[textIndex]}
            </p>
            {
              textIndex+1 < panels.length ? (
                <div>
                  <BackButton previousText={this.previousText} />
                  <ForthButton nextText={this.nextText} />
                </div>
              ) : (
                  <div>
                      <ForthButton nextText={this.redirectToNextPage} />
                  </div>
              )
            }
          
          <p></p>
        </div>
      </div>
    );
  }
}

export default withRouter(LearningGoals);

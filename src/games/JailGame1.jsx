import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import BackButton from '../components/BackButton';
import BackButtonInactive from '../components/BackButtonInactive';
import ForthButton from '../components/ForthButton';
import SettingsButton from '../components/SettingsButton';
import QuizQuestion from '../components/QuizQuestion';

class JailGame1 extends Component {
  constructor(props) {
    super(props);
    this.child1 = React.createRef();
    this.child2 = React.createRef();
    this.child3 = React.createRef();
    this.child4 = React.createRef();
    this.child5 = React.createRef();
    this.state = {
      textIndex: 0,
      panels: [],
      headline: '',
      nextPageID: 0,
      nextPage: '',
      buttonClicked : false,
      };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const { addingPages } = this.props;
    addingPages(ID);
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

  nextText() {
    const { panels, textIndex } = this.state
    const theSize = panels.length - 1;
    if (textIndex >= 0 && textIndex < theSize) {
      this.setState(prevState => {
        return {textIndex: prevState.textIndex + 1}
     })
    }
    this.setState({buttonClicked :false});
  }

  previousText() {
    const theSize = this.state.panels.length - 1;
    if (this.state.textIndex > 0 && this.state.textIndex <= theSize) {
      this.setState(prevState => {
        return {textIndex: prevState.textIndex - 1}
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

  validate() {
    this.child1.current.validate();
    this.child2.current.validate();
    this.child3.current.validate();
    this.child4.current.validate();
    this.child5.current.validate();
    this.setState({buttonClicked :true});
  }

  render() {
    const { ID } = this.props.location.state;
    const { panels, textIndex, headline, buttonClicked } = this.state;
    console.log(this.state.buttonClicked);

    return (
      <div className="JailGame1">
         <SideNavigation ID={ID}/>
         <SettingsButton goBack={() => this.props.history.goBack()}/>
        <div className="pagecontent">
          <h1>{headline}</h1>
          {(panels[textIndex] !== undefined) ? (
          <div className="quizQuestions">
            <div className="question" dangerouslySetInnerHTML={{ __html: panels[textIndex].question}}></div>
            <button className="quiz-btn" onClick={this.validate}>Submit answers</button>
            <QuizQuestion key={"question1"+textIndex} ref={this.child1} option={panels[textIndex].choices[0]} rightAnswers={panels[textIndex].correctAnswers} />
            <QuizQuestion key={"question2"+textIndex}  ref={this.child2} option={panels[textIndex].choices[1]} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion key={"question3"+textIndex}  ref={this.child3} option={panels[textIndex].choices[2]} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion key={"question4"+textIndex}  ref={this.child4} option={panels[textIndex].choices[3]} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion key={"question5"+textIndex}  ref={this.child5} option={panels[textIndex].choices[4]} rightAnswers={panels[textIndex].correctAnswers}/>
            </div>
          ) : ( <div></div>)}
          {
            (textIndex === 0 && panels.length > 1 && buttonClicked === true) ? (
              <div className="buttoncontainer">
                <BackButtonInactive/>
                <ForthButton nextText={this.nextText} />
              </div>
            ) : (
                textIndex + 1 < panels.length  && buttonClicked === true) ? (
                  <div className="buttoncontainer">
                    <BackButton previousText={this.previousText} />
                    <ForthButton nextText={this.nextText} />
                  </div>
                ) : (
                  buttonClicked === true ? (
                    <div className="buttoncontainer">
                      <BackButton previousText={this.previousText} />
                      <ForthButton nextText={this.redirectToNextPage} />
                    </div>
                  ) : (<div></div>))
          }
        <p></p>
      </div>
      </div>
    );
  }
}

export default withRouter(JailGame1);

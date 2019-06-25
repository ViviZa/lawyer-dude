import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import BackButton from '../components/BackButton';
import BackButtonInactive from '../components/BackButtonInactive';
import ForthButton from '../components/ForthButton';
import SettingsButton from '../components/SettingsButton';
import QuizQuestion from './../components/QuizQuestion';


class FindTheLicense extends Component {
  constructor(props) {
    super(props);
    this.child1 = React.createRef();
    this.child2 = React.createRef();
    this.child3 = React.createRef();
    this.child4 = React.createRef();
    this.child5 = React.createRef();
    this.child6 = React.createRef();
    this.child7 = React.createRef();
    this.child8 = React.createRef();
    this.child9 = React.createRef();
    this.state = {
      textIndex: 0,
      panels: [],
      headline: '',
      nextPageID: 0,
      nextPage: '',
      choices: [],
      quizAnswers: new Set()
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
      choices : filteredJSON[0].answers,
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
    this.child6.current.validate();
    this.child7.current.validate();
    this.child8.current.validate();
    this.child9.current.validate();
  }

  render() {
    const { ID } = this.props.location.state;
    const { panels, textIndex, headline, choices } = this.state;
    return (
      <div className="FindTheLicense">
         <SideNavigation ID={ID}/>
         <SettingsButton goBack={() => this.props.history.goBack()}/>
        <div className="pagecontent">
          <h1>{headline}</h1>
          {(panels[textIndex] !== undefined) ? (
          <div className="quizQuestions">
            <div className="question">
              {panels[textIndex].question}
              <button className="quiz-btn" onClick={this.validate}>Submit answers</button>
            </div>
           
            <QuizQuestion ref={this.child1} id={choices[0].id} choice={choices[0].choice} rightAnswers={panels[textIndex].correctAnswers} />
            <QuizQuestion ref={this.child2} id={choices[1].id} choice={choices[1].choice} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion ref={this.child3} id={choices[2].id} choice={choices[2].choice} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion ref={this.child4} id={choices[3].id} choice={choices[3].choice} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion ref={this.child5} id={choices[4].id} choice={choices[4].choice} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion ref={this.child6} id={choices[5].id} choice={choices[5].choice} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion ref={this.child7} id={choices[6].id} choice={choices[6].choice} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion ref={this.child8} id={choices[7].id} choice={choices[7].choice} rightAnswers={panels[textIndex].correctAnswers}/>
            <QuizQuestion ref={this.child9} id={choices[8].id} choice={choices[8].choice} rightAnswers={panels[textIndex].correctAnswers}/>
          </div>
          ) : ( <div></div>)}
          {
            (textIndex === 0 && panels.length > 1) ? (
              <div className="buttoncontainer">
                <BackButtonInactive/>
                <ForthButton nextText={this.nextText} />
              </div>
            ) : (
                textIndex + 1 < panels.length ? (
                  <div className="buttoncontainer">
                    <BackButton previousText={this.previousText} />
                    <ForthButton nextText={this.nextText} />
                  </div>
                ) : (
                    <div className="buttoncontainer">
                      <BackButton previousText={this.previousText} />
                      <ForthButton nextText={this.redirectToNextPage} />
                    </div>
                  ))
          }
        <p></p>
      </div>
      </div>
    );
  }
}

export default withRouter(FindTheLicense);

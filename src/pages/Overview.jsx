import React, { Component } from 'react';
import { withRouter } from 'react-router';
import data from '../data.json';
import { ReactComponent as TutorialIcon } from '../images/tutorial_icon.svg';
import { ReactComponent as ResourceIcon } from '../images/resource_icon.svg';
import { ReactComponent as GameIcon } from '../images/game_icon.svg';
import SettingsButton from '../components/SettingsButton.jsx';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      headline: '',
      headlineTutorial: '',
      headlineResources: '',
      headlineGames: '',
      textTutorial: '',
      textResources: '',
      textGames: '',
      nextPages: [],
      nextPageIDs: [],
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
    const nextPageIDs = filteredJSON[0].nextPageIDs;
    this.setState({
      headline: filteredJSON[0].headline,
      nextPages: filteredJSON[0].nextPage,
      nextPageIDs: nextPageIDs,
      headlineTutorial: filteredJSON[0].tutorial[0].head,
      textTutorial: filteredJSON[0].tutorial[0].text,
      headlineResources: filteredJSON[0].resources[0].head,
      textResources: filteredJSON[0].resources[0].text,
      headlineGames: filteredJSON[0].games[0].head,
      textGames: filteredJSON[0].games[0].text,
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
    const { headline, headlineTutorial, headlineResources, headlineGames, textTutorial, textResources, textGames } = this.state;

    return (
      <div className="Overview">

        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="startpagecontent overviewpagecontent">
          <h1 className="headline">{headline}</h1>
          <div className="container">
            <div className="row">
            <div className="contentBox col">
              <div className="iconcontainer">
                <TutorialIcon className="boxicon" />
                <h3 className="headline" dangerouslySetInnerHTML={{ __html: headlineTutorial }} />
              </div>
              <div className="contentText"  dangerouslySetInnerHTML={{ __html: textTutorial }} />
              <button className="StartButton" onClick={() => this.redirectToNextPage(0)}>START</button>
            </div>
            <div className="contentBox col">
              <div className="iconcontainer">
                <ResourceIcon className="boxicon" />
                <h3 className="headline">{headlineResources}</h3>
              </div>
              <div className="contentText" dangerouslySetInnerHTML={{ __html: textResources }} />
              <button className="StartButton" onClick={() => this.redirectToNextPage(1)}>READ</button>
            </div>
            <div className="contentBox col">
              <div className="iconcontainer">
                <GameIcon className="boxicon" />
                <h3 className="headline">{headlineGames}</h3>
              </div>
              <div className="contentText" dangerouslySetInnerHTML={{ __html: textGames }} />
              <button className="StartButton" onClick={() => this.redirectToNextPage(2)}>PLAY</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Overview);

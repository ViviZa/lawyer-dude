import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import BackButton from '../components/BackButton';
import BackButtonInactive from '../components/BackButtonInactive';
import ForthButton from '../components/ForthButton';
import SettingsButton from '../components/SettingsButton';
import { ReactComponent as LDHeadHappy } from '../images/Lawyerdude-head-happy.svg';
import Screencast from '../images/attribution-generator.gif'

class NoDecision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: [],
      headline: '',
      nextPageID: 0,
      nextPage: '',
    };
    this.previousText = this.previousText.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
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

  redirectToNextPage() {
    const { history } = this.props;
    const { nextPageID, nextPage } = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID },
    });
  }

  render() {
    const { panels, headline } = this.state;
    const {textIndex, nextText, previousText} = this.props;
    const { ID } = this.props.location.state;

    return (
      <div className="Startpage">
        <SideNavigation ID={ID}/>
        <SettingsButton goBack={() => this.props.history.goBack()}/>
        <div className="pagecontent">
          <h1 className="headline">
            {headline}
          </h1>
          {
              (panels[textIndex] && panels[textIndex].text !== undefined) ? (
              <div className={panels[textIndex].cssClass}>
                  <p className="speechbubbletext">
                  <div dangerouslySetInnerHTML={{ __html: panels[textIndex].text}}/>
                </p>
              </div>
              ) : (
                <div className="speech">
                  <p className="speechbubbletext">
                  <div dangerouslySetInnerHTML={{ __html: panels[textIndex]}}/>
                  </p>
                </div>
              )
          }
          <div className="speechlawyer-container">
            <LDHeadHappy className="speechlawyer-happy"/>
          </div>
          {ID === 25 &&
            <h2>
             <img src={Screencast} href="https://lizenzhinweisgenerator.de/?lang=en" className="defaultImg" alt="logo" />
            </h2>
          }
          {
            (textIndex === 0 && panels.length > 1) ? (
              <div className="buttoncontainer">
                <BackButtonInactive/>
                <ForthButton nextText={() => nextText(panels)} />
              </div>
            ) : (
                textIndex + 1 < panels.length ? (
                  <div className="buttoncontainer">
                    <BackButton previousText={() => previousText(panels)} />
                    <ForthButton nextText={() => nextText(panels)} />
                  </div>
                ) : (
                    <div className="buttoncontainer">
                      <BackButtonInactive/>
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

export default withRouter(NoDecision);

import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import BackButtonInactive from '../components/BackButtonInactive';
import ForthButton from '../components/ForthButton';
import { ReactComponent as LDFull } from '../images/Lawyerdude-side.svg';
import SettingsButton from '../components/SettingsButton';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: [],
      headline: '',
      nextPageID: 0,
      nextPage: '',
    };
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
    const { ID } = this.props.location.state;

    return (
      <div className="Startpage">
        <SideNavigation ID={ID}/>
        <SettingsButton/>
        <div className="pagecontent">
          
          <h1 className="headline">
            {headline}
          </h1>
          <div className="welcomeblock">
            <LDFull className="fulllawyer"/>  
            <div className="welcomepanels">
                <p>
                    {panels.map((panel) => <li className="welcomepanel">{panel}</li>)}
                </p>
            </div>
          </div>
          <div className="buttoncontainer">
            <BackButtonInactive/>
            <ForthButton nextText={this.redirectToNextPage} />
          </div>
          <p></p>
        </div>
      </div>
    );
  }
}

export default withRouter(WelcomePage);

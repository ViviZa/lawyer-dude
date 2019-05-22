import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
import { withRouter } from 'react-router';
import DropDown from './../components/DropDown';


class MatchTheLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
          selectHeadlines : ["Alle", " Kann kostenlos geändert, freigegeben und verwendet werden", "Öffentliche Domäne",
          "Kann kostenlos geändert, freigegeben und kommerziell verwendet werden", "Kann kostenlos freigegeben und verändert werden",
          "Kann kostenlos freigegeben und kommerziell verwendet werden", "Alle Creative Commons"]
    };
  }

  render() {
    const {selectHeadlines } = this.state;
    const dropDowns = selectHeadlines.map( (headline) => {
      return (
      <div>
          <DropDown headline={headline}/>
            <p></p>
            <p></p>
      </div>
        )
});

    return (
      <div className="Startpage">
        <button onClick={() => this.props.history.goBack()}>Go Back</button>
        <SideNavigation />
        <div className="pagecontent">
          <h1>
            Match the License
          </h1>
          {dropDowns}
        </div>
      </div>
    );
  }
}

export default withRouter(MatchTheLicense);

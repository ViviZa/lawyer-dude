import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import DropDown from './../components/DropDown';


class MatchTheLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
          licenses : [
            {explanation: "Alle", license: "CR und OC" },
            {explanation: "Kann kostenlos geändert, freigegeben und verwendet werden", license: "unklar, da kommenzielle Nutzung nicht angegeben" } ,
            {explanation: "Öffentliche Domäne", license: "CC-0" },
            {explanation: "Kann kostenlos geändert, freigegeben und kommerziell verwendet werden", license: "CC-BY" },
            {explanation: "Kann kostenlos freigegeben und verändert werden", license: "unklar, da Modifizierung und kommenzielle Nutzung nicht angegeben" },
            {explanation: "Kann kostenlos freigegeben und kommerziell verwendet werden", license: "unklar, da keine Angabe zur Modifizierung" },
            {explanation: "Alle Creative Commons", license: "CC-*" },
      ]
    };
    this.validateSelection = this.validateSelection.bind(this);
  }

  validateSelection() {

  }

  render() {
    const {licenses } = this.state;
    const dropDowns = licenses.map( (license) => {
      return (
      <div>
          <DropDown explanation={license.explanation} license={license.license}/>
            <p></p>
            <p></p>
      </div>
        )
  });

    return (
      <div className="MatchTheLicense">
        <button onClick={() => this.props.history.goBack()}>Go Back</button>
        <SideNavigation />
        <div className="pagecontent">
          <h1>
            Match the License
          </h1>
          {dropDowns}
          <p></p>
          <button>Validate</button>
        </div>
      </div>
    );
  }
}

export default withRouter(MatchTheLicense);

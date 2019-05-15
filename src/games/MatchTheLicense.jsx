import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import Select from 'react-select';

const options = [
  { value: 'CRundCC', label: 'Alle' },
  { value: 'unklar', label: 'Kann kostenlos geändert, freigegeben und verwendet werden' },
  { value: 'CC-O', label: 'Öffentliche Domäne' }
];

class MatchTheLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
          selectedOption: null,
          selectHeadlines : ["CR und CC", "CC-*", "unklar, da kommenzielle Nutzung nicht angegeben",
          "unklar, da Modifizierung und kommenzielle Nutzung nicht angegeben", "unklar, da keine Angabe zur Modifizierung",
          "CC-BY", "CC-0"]
    };
  }

  handleChange = (selectedOption) => {
     this.setState({ selectedOption });
     console.log(`Option selected:`, selectedOption);
  }

  render() {
  const { selectedOption, selectHeadlines } = this.state;
  const dropDowns = selectHeadlines.map( (headline) => {
        return (
        <div>
            <p>{headline}</p>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              />
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

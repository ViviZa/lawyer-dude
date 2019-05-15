import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
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
    };
  }

  handleChange = (selectedOption) => {
     this.setState({ selectedOption });
     console.log(`Option selected:`, selectedOption);
  }

  render() {
  const { selectedOption } = this.state;
    return (
      <div className="Startpage">
        <button onClick={() => this.props.history.goBack()}>Go Back</button>
        <SideNavigation />
        <div className="pagecontent">
          <h1>
            Match the License
          </h1>
          <p>CR und OC</p>
          <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                />
        </div>
      </div>
    );
  }
}

export default withRouter(MatchTheLicense);

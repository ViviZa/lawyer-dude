import React, { Component } from 'react';
import '../styles/style.css';
import Select from 'react-select';

const options = [
    { value: '1', label: 'CR und CC' },
    { value: '2', label: 'CC-*' },
    { value: '3', label: 'unklar, da kommenzielle Nutzung nicht angegeben' },
    { value: '4', label: 'unklar, da Modifizierung und kommenzielle Nutzung nicht angegeben' },
    { value: '5', label: 'unklar, da keine Angabe zur Modifizierung' },
    { value: '6', label: 'CC-BY' },
    { value: '7', label: 'CC-0' }
  ];

class DropDown extends Component {
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
          <div>
            <p>{this.props.headline}</p>  
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
          </div>  
        );
      }
}

export default DropDown;

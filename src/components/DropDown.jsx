import React, { Component } from 'react';
import Select from 'react-select';

const options = [
    { value: '1', label: 'CR und OC'},
    { value: '2', label: 'CC-*'},
    { value: '3', label: 'unklar, da kommenzielle Nutzung nicht angegeben' },
    { value: '4', label: 'unklar, da Modifizierung und kommenzielle Nutzung nicht angegeben' },
    { value: '5', label: 'unklar, da keine Angabe zur Modifizierung' },
    { value: '6', label: 'CC-BY' },
    { value: '7', label: 'CC-0'}
  ];

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            color : "white"
        };
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    validate(){
      var temp = true;
      const { selectedOption } = this.state;
      if(selectedOption == null || selectedOption.label !== this.props.license ) {
        temp = false;
        this.setState({color : "red"});
      } else {
        this.setState({color : "green"});
      }
      return temp;
    }

      render() {
        const { selectedOption } = this.state;
    
        return (
          <div className="dropdown">
            <p>{this.props.explanation}</p>  
            <div>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
            <div className="validation" style={{background: this.state.color}}></div>    
            </div>
          </div>  
        );
      }
}

export default DropDown;

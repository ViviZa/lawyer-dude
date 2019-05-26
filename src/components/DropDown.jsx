import React, { Component } from 'react';
import '../styles/style.css';
import Select from 'react-select';

const options = [
    { value: '1', label: 'CR und OC' },
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
            color : "white"
        };
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        if(this.props.license === selectedOption.label) {
            console.log("thats right");
            this.setState({color : "green"});
        } else {
            console.log("thats wrong");
            this.setState({color : "white"});
        }
    }

      render() {
        const { selectedOption } = this.state;
    
        return (
          <div style={{background: this.state.color}} >
            <p>{this.props.explanation}</p>  
            <div >
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

export default DropDown;

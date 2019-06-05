import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import DropDown from './../components/DropDown';
import BackButtonInactive from '../components/BackButtonInactive';
import ForthButton from '../components/ForthButton';

const licenses = [
  {explanation: "Alle", license: "CR und OC" },
  {explanation: "Kann kostenlos geändert, freigegeben und verwendet werden", license: "unklar, da kommenzielle Nutzung nicht angegeben" } ,
  {explanation: "Öffentliche Domäne", license: "CC-0" },
  {explanation: "Kann kostenlos geändert, freigegeben und kommerziell verwendet werden", license: "CC-BY" },
  {explanation: "Kann kostenlos freigegeben und verändert werden", license: "unklar, da Modifizierung und kommenzielle Nutzung nicht angegeben" },
  {explanation: "Kann kostenlos freigegeben und kommerziell verwendet werden", license: "unklar, da keine Angabe zur Modifizierung" },
  {explanation: "Alle Creative Commons", license: "CC-*" },
];

class MatchTheLicense extends Component {
  constructor(props) {
    super(props);
    this.child0 = React.createRef();
    this.child1 = React.createRef();
    this.child2 = React.createRef();
    this.child3 = React.createRef();
    this.child4 = React.createRef();
    this.child5 = React.createRef();
    this.child6 = React.createRef();
    this.state = {
      headline: '',
      nextPageID: 0,
      nextPage: '',
    };
    this.validateSelection = this.validateSelection.bind(this);
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

  validateSelection() {
    this.child0.current.validate();
    this.child1.current.validate();
    this.child2.current.validate();
    this.child3.current.validate();
    this.child4.current.validate();
    this.child5.current.validate();
    this.child6.current.validate();
  }


  render() {
   // const { headline} = this.state;
    const { ID } = this.props.location.state;

    return (
      <div className="MatchTheLicense">
         <SideNavigation ID={ID}/>
        <div className="pagecontent">
          <h1>
          Match the License
          </h1>
          <DropDown ref={this.child0} explanation={licenses[0].explanation} license={licenses[0].license}/>
          <DropDown ref={this.child1} explanation={licenses[1].explanation} license={licenses[1].license}/>
          <DropDown ref={this.child2} explanation={licenses[2].explanation} license={licenses[2].license}/>
          <DropDown ref={this.child3} explanation={licenses[3].explanation} license={licenses[3].license}/>
          <DropDown ref={this.child4} explanation={licenses[4].explanation} license={licenses[4].license}/>
          <DropDown ref={this.child5} explanation={licenses[5].explanation} license={licenses[5].license}/>
          <DropDown ref={this.child6} explanation={licenses[6].explanation} license={licenses[6].license}/>
          <p></p>
          <button onClick={this.validateSelection}>Validate</button>
        </div>
        <p></p>
        <div className="buttoncontainer">
        <BackButtonInactive/>
        <ForthButton nextText={this.redirectToNextPage} />
        </div>
      </div>
    );
  }
}

export default withRouter(MatchTheLicense);

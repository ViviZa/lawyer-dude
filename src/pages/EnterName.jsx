import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import ForthButton from '../components/ForthButton';
import BackButton from './../components/BackButton';
import BackButtonInactive from '../components/BackButtonInactive';
import SettingsButton from '../components/SettingsButton';
import { ReactComponent as Llama } from '../images/Lawyerdude-llama.svg';
import { ReactComponent as LDHeadHappy } from '../images/Lawyerdude-head-happy.svg';

class EnterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: [],
      headline: '',
      nextPageID: 0,
      nextPage: '',
      username : '',
      errorText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const { addingPages, resetTextIndex } = this.props;
    // resetTextIndex();
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

  redirectToNextPage(event){
    if(this.state.username === ""){
      event.preventDefault();
      this.setState({errorText: "Please enter a name!"});
    } else {
      this.setState({errorText: ""});
      localStorage.setItem('username', JSON.stringify(this.state.username));
      const {history} = this.props;
      this.setState({username: event.target.value});
      const {nextPageID, nextPage} = this.state;
      history.push({
        pathname: nextPage,
        state: { ID: nextPageID },
      });
    }
 
  }

  handleChange(event) {
      this.setState({username: event.target.value});
  }

  render() {
    const { panels, headline, errorText,  } = this.state;
    const {textIndex, nextText, previousText} = this.props;
    const { ID } = this.props.location.state;
    return (
      <div className="Startpage">
        <SideNavigation ID={ID}/>
        <SettingsButton goBack={() => this.props.history.goBack()}/>
        <div className="pagecontent">
          <h1>
            {headline}
          </h1>
          <div className="llama-container">
            <Llama className="entername-llama"/>  
          </div>
          <div className="speech">
            <p className="speechbubbletext">
            <div dangerouslySetInnerHTML={{ __html: panels[textIndex]}}/>
            </p>
          </div>
          <div className="speechlawyer-container">
            <LDHeadHappy className="speechlawyer-happy"/>
          </div>
          {
            textIndex === 0 ? (
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
                  <div className="entername-form">
                  <form onSubmit={(event) => this.redirectToNextPage(event)}>
                    <div className={"errorMessage"}>
                      {errorText}
                    </div>
                    <label className="entername-label">
                      <input className="entername-input" type="text" value={this.state.username} onChange={this.handleChange} />
                      Enter your name
                    </label>
                    <input className="save-name-btn" type="submit" value="Let's go"/>
                  </form>
                </div>
                  ))
          }
          <p></p>
        </div>
      </div>
    );
  }
}

export default withRouter(EnterName);

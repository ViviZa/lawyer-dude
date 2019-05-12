import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
import { withRouter } from 'react-router';
import data from './Start.json';
import Buttons from '../components/Buttons';

class Startpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      panels: [],
      headline: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    console.log(jsonData);
    this.setState({
      panels: jsonData[0].panels,
      headline: jsonData[0].headline
    })
  }

  redirectToNextPage() {
    const { history } = this.props;
    history.push("/story");
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    this.props.setUserName(this.state.username);
    this.props.goToNextPage(this.props.nextPage);
    event.preventDefault();
  }

  render() {
    const { panels, textIndex, headline } = this.state;

    return (
      <div className="Startpage">
        <SideNavigation />
        <div className="pagecontent">
          <h1>
            {headline}
          </h1>
          <Buttons panels={panels} />
          <p></p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter your name:
              <input type="text" value={this.state.username} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Let's go" onClick={() => this.redirectToNextPage()} />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Startpage);

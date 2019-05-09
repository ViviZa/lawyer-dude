import React, { Component } from 'react';
import SideNavigation from '../../components/SideNavigation';
import '../../styles/style.css';
import { withRouter } from 'react-router';
import data from './Start.json';
import ForthButton from '../../components/ForthButton';

class Startpage extends Component {
 constructor(props) {
    super(props);
    this.state = {
      username: '',
      textIndex: 0,
      panels: [],
      headline: ''
    };

    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount(){
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    this.setState({
      panels: jsonData[0].panels,
      headline: jsonData[0].headline
    })
  }

  redirectToNextPage(){
    const {history} = this.props;
    history.push("/learninggoals");
  }

  render() {
    const { headline} = this.state;

    return (
      <div className="Startpage">
        <SideNavigation/>
        <div className="pagecontent">
          <h1>{headline}</h1>
          <h3>an e-learning unit on using pictures from the internet without going to jail</h3>
          <ForthButton nextText={this.redirectToNextPage} />
          <p></p>
        </div>
      </div>
    );
  }
}

export default withRouter(Startpage);

import React, { Component } from "react";
import { withRouter } from "react-router";
import SideNavigation from "../components/SideNavigation";
import SettingsButton from '../components/SettingsButton.jsx';
import JailGame1 from "../games/JailGame1";
import JailGameTwo from "../games/JailGameTwo/JailGameTwo";

class JailGamesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { game } = this.props;
    return (
        <div>
            <SideNavigation ID={800} />
            <SettingsButton goBack={() => this.props.history.goBack()} />
            <div className="pagecontent">
                {game}
            </div>
        </div>
    );
  }
}

export default withRouter(JailGamesPage);

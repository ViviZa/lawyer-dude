import React, { Component } from 'react';
import {getCurrentPage} from "./pages/HelperFunction";
import data from "./data";
import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);
        this.onLoadPage = this.onLoadPage.bind(this);
        this.onSetUsername = this.onSetUsername.bind(this);
        this.onSetNextPage = this.onSetNextPage.bind(this);
        this.state = {
            pageArray : [],
            currentPageIndex : 0,
            username : ""
        };
      }

      componentWillMount() {
        this.onLoadPage();
      }

      onLoadPage() {
        const dataString = JSON.stringify(data);
        let jsonData = JSON.parse(dataString);
        let pages = [];

        for (let i = 0; i < jsonData.length; i++) {
            pages.push(jsonData[i]);
        }
        this.setState({pageArray: pages});
       }

      onSetUsername(uname) {
        this.setState({username: uname});
        }

      onSetNextPage(page) {
          this.setState({currentPageIndex: page});
        }


      render() {
        console.log("#########" + this.state.username + "#########");
        const currentPage = getCurrentPage(this.state.pageArray[this.state.currentPageIndex], this.onSetUsername, this.onSetNextPage);
        return (
          <div className="App">
            {currentPage}
          </div>
        );
      }

 }



export default App;

import React, { Component } from 'react';
import {getCurrentPage} from "./pages/HelperFunction";
import data from "./data";
import './App.css';

class App extends Component {

constructor(props) {
    super(props);
    this.onLoadPage = this.onLoadPage.bind(this);
    this.state = {
        pageArray : [],
        currentPageIndex : 2, //change manually to render new page
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


  render() {
    const currentPage = getCurrentPage(this.state.pageArray[this.state.currentPageIndex]);
    return (
      <div className="App">
        {currentPage}
      </div>
    );
  }

 }



export default App;

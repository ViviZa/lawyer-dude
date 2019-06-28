import React, { Component } from "react";
import { withRouter } from "react-router";
import Sortable from 'react-sortablejs';

const images = [
  "images/Cc-nd.svg",
  "images/Cc-by.svg"
];

class JailGameTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  validate() {}

  render() {
    return (
      <div style={{backgroundColor: 'white'}} ref={this.dragulaDecorator}>
           <Sortable
            options={{
                group: 'shared'
            }}
            tag="div"
        >
        {images.map((image, index) => (
          <img src={image} alt="" key={index}/>
        ))}
        </Sortable>
        <Sortable
            options={{
                group: 'shared'
            }}
            tag="div"
            stye={{height: '500px'}}
        >
       <p style={{border: '1px solid black', height: '100px', width: '100px'}}/>
       <p style={{border: '1px solid black', height: '100px', width: '100px'}}/>
        </Sortable>
      </div>
    );
  }
}

export default withRouter(JailGameTwo);

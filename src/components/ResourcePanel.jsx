import React from "react";
import { ReactComponent as LDFull } from '../images/Lawyerdude-side.svg';

const ResourcePanel = props => {
  const { text, images } = props;

  return (
    <div className="container">
      <div className="row">
        <div className="resourceContainer">
      <div className= "resourcetext col">
        <div dangerouslySetInnerHTML={{ __html: text }}/>
          {images && images.map((image, index) => (
            <img className="resource-image" key={index} src={image} alt="" />
            ))}
            <div className="spaceCol">&nbsp;</div>
      </div>
      </div>
        {/* <LDFull className="fulllawyer"/> */}
    </div>
    </div>
  );
};

export default ResourcePanel;

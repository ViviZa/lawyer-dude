import React from "react";
import { ReactComponent as LDFull } from '../images/Lawyerdude-side.svg';

const ResourcePanel = props => {
  const { text, images } = props;

  return (
    <div className="resourceContainer">
      <div className="speechbubbletext">
        <div dangerouslySetInnerHTML={{ __html: text }} />
          {images && images.map((image, index) => (
            <img className="resource-image" key={index} src={image} alt="" />
          ))}
      </div>  
        <LDFull className="fulllawyer"/>
    </div>
  );
};

export default ResourcePanel;

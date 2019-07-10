import React from "react";

const ResourcePanel = props => {
  const { text, images } = props;

  return (
    <div className="container">
      <div className="row">
        <div className="resourceContainer">
      <div className= "resourcetext col">
        <div dangerouslySetInnerHTML={{ __html: text }}/>
          {images && images.map((image, index) => (
            <img className={image.css} key={index} src={image.path} alt="" />
            ))}
      </div>
      </div>
    </div>
    </div>
  );
};

export default ResourcePanel;

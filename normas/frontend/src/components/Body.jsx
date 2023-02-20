import React from "react";

const Body = ({ content }) => {
  return (
    <div
      className="uk-container uk-container-expand"
      id="content"
      data-uk-height-viewport="expand: true"
    >
      {content}
    </div>
  );
};

export default Body;

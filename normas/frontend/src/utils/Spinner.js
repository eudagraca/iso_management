import React from "react"

const Spinner = ({ loading }) => {
  return (
    <div
      id="preloader"
      className="uk-overlay-primary uk-position-cover"
    >
      <p className="uk-width-1-1  uk-flex uk-flex-center">
        <span className="uk-margin-large-top" uk-spinner="ratio: 8.5"></span>
      </p>
      <p className="uk-text-center uk-text-large uk-text-light">
        Carregando a página. . .
      </p>
    </div>
  );
};

export default Spinner;

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";


export default function Dashboard() {
  // const [mainSession, setMainSession] = useState(false);
  // setMainSession(JSON.parse(localStorage.getItem('mainSession')))
let mainSession = (JSON.parse(localStorage.getItem('mainSession')))

// console.log(mainSession);

  return (
    <div className="uk-background-default uk-padding">
      <h3 className="uk-margin-medium-left uk-text-bold uk-margin-large-top">
        Visão Geral
      </h3>
      <div className="uk-child-width-1-3@s uk-grid-match" uk-grid="uk-grid">
        <div>
          <div className="uk-card uk-card-small uk-card-hover uk-card-body uk-border-rounded">
            <p className="uk-text-bolder uk-h4">
              
              <span uk-icon="icon: users; ratio: 1.5 "></span> 
            </p>
            <p className="uk-text-large uk-text-bolder"><span className="uk-text-light"> {mainSession&& mainSession.users}</span> Usuarios</p>
          </div>
        </div>
        <div>
          <div className="uk-card uk-card-small  uk-card-hover uk-card-body uk-border-rounded">
            <p className="uk-text-bolder uk-h4">
              {" "}
              <span uk-icon="icon: album; ratio: 1.5 "></span> 
            </p>
            <p className="uk-text-large uk-text-bolder"><span className="uk-text-light"> {mainSession&& mainSession.sectors}</span> Sectores</p>
          </div>
        </div>
        <div>
          <div className="uk-card uk-card-small uk-card-hover uk-card-body uk-border-rounded">
            <p className="uk-text-bolder uk-h4">
              {" "}
              <span uk-icon="icon: file-pdf; ratio: 1.5 "></span> 
            </p>
            <p className="uk-text-large uk-text-bolder"><span className="uk-text-light"> {mainSession&&  mainSession.documents}</span> Normas ISO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

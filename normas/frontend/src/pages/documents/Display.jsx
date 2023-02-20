import React from "react";
import { useLocation } from "react-router-dom";
import PdfViewer from "../pdf/PdfViewer";

function CallPDF() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="content uk-padding-large">
        <div className="left-logo uk-flex uk-flex-middle ">
          <img
            className="uk-border-rounded profile-img uk-align-right uk-margin-large-top"
            src="/images/logo.PNG"
            alt=""
          />
          <div>
          <p className="uk-margin-large-right">
            <span className="uk-text-bolder uk-text-lead">{`${data.name}`}</span>
            <span className="uk-text-light uk-text-large uk-text-lighter"> - {`${data.type}`} / </span>
            <code>{data.published}</code>
          </p>
          </div>
        </div>

      <PdfViewer pdf={data.code} />
    </div>
  );
}

export default CallPDF;

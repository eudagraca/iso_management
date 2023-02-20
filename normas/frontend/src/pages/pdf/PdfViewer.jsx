import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Spinner from "../../components/Spinner";
import "../../PdfViewer.css";
import { BASE_URL } from "../../utils/utils";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };


  return (
    <div>
      <div className="backtohome">
        <button className="uk-button-secondary uk-border-rounded uk-button-small"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/normas';
          }}
        >
          <span uk-icon="arrow-left"></span> Voltar a pagina anterior
        </button>
      </div>
      <div className="controls">
        <button className="uk-button uk-button-primary" onClick={prevPage} disabled={pageNumber === 1}>
          Prev
        </button>
        <button className="uk-button uk-button-primary" onClick={nextPage} disabled={pageNumber === numPages}>
          Next
        </button>
      </div>

      <Document
        file={`${BASE_URL}documentos/${pdf}/display`}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => e.preventDefault()}
        loading={<Spinner />}
        className="pdf-container"
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="controls">
        <button className="uk-button uk-button-primary" onClick={prevPage} disabled={pageNumber === 1}>
          Prev
        </button>
        <button className="uk-button uk-button-primary" onClick={nextPage} disabled={pageNumber === numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;

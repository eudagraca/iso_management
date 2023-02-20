import Aside from "../../components/Aside";
import Header from "../../components/Header";
import MessageAlert from "../../components/Alert";
import Layout from "../Layout";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { BASE_URL } from "../../utils/utils";
import Spinner from "../../components/Spinner";
import { normaHeader } from "../../utils/datatable/config";

function ListDocuments() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState();
  let normaData = [];
  useEffect(() => {
    const getSectores = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}documentos`);
        const data = await response.json();
        setDocuments(data["body"]);

        for (const norma of data["body"]) {
          normaData.push({
            id: norma.id,
            name: `${norma.name} ${norma.code} `,
            type: `${norma.type} `,
            description: `${norma.description}`,
            published: `${norma.published}`,
            code: `${norma.code}`,
          });
        }
        setTableData({
          columns: normaHeader,
          data: normaData,
        });
        setIsLoading(false);

      } catch (error) {
        console.error(error);
      }
    };
    getSectores();
  }, []);

  return (
    <Layout
      header={<Header />}
      content={
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="uk-padding">
              <h3 className="uk-text-upper uk-margin-medium-top uk-text-bold">
                Lista de Normas
              </h3>
              <MessageAlert />

              <DataTableExtensions {...tableData}>
                <DataTable
                  columns={normaHeader}
                  data={normaData}
                  noHeader
                  defaultSortField="id"
                  defaultSortAsc={false}
                  // onRowClicked={onRowClicked}
                  pagination
                  highlightOnHover
                />
              </DataTableExtensions>
            </div>
          )}
        </>
      }
      aside={<Aside />}
    />
  );
}

export default ListDocuments;

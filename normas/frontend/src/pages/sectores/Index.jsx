import { useEffect } from "react";
import { useState } from "react";
import MessageAlert from "../../components/Alert";
import Aside from "../../components/Aside";
import { BASE_URL } from "../../utils/utils";
import Header from "../../components/Header";
import Layout from "../Layout";
import { Link } from "react-router-dom";

function ListSectores() {
  const [sectores, setSectores] = useState(false);

  useEffect(() => {
    const getSectores = async () => {
      try {
        const response = await fetch(`${BASE_URL}sectores/`);
        const data = await response.json();
        setSectores(data);
        console.log(data);
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
        <div className="uk-padding">
          <h3 className="h3 mb-3 font-weight-normal uk-margin-medium-top  uk-text-bold">
            Lista de sectores
          </h3>
          <MessageAlert  />
          

          <table
            className="uk-table uk-table-hover uk-table-striped"
            id="generic-table"
          >
            <thead>
              <th className="uk-text-left uk-text-uppercase">Nome</th>
              <th className="uk-text-left uk-text-uppercase">Responsavel</th>
              <th
                className="uk-text-left uk-table-shrink uk-text-uppercase"
                colSpan="2"
              >
                ACÇÃO
              </th>
            </thead>
            <tbody>
              {sectores &&
                sectores.map((sector, key) => (
                  <tr key={key}>
                    <td>{sector.name}</td>
                    <td>
                      {sector.users
                        ? sector.users[0].first_name +
                          " " +
                          sector.users[0].last_name
                        : ""}
                    </td>
                    <td>
                      {" "}
                      {/* <a
                    className="uk-button uk-text-capitalize uk-button-small uk-margin-small-right"
                    href="/sectores/edit/1"
                  >
                    {" "}
                    <span
                      href="#"
                      uk-icon="icon:  file-text; ratio: 1.2"
                    ></span>
                  </a> */}
                      <Link
                        className="uk-button uk-text-capitalize uk-button-small uk-margin-small-right"
                        to="/sectores/edit"
                        state={sector}
                      >
                        <span
                          href="#"
                          uk-icon="icon: file-text; ratio: 1.2"
                        ></span>
                      </Link>
                      <a
                        className="uk-button uk-text-capitalize uk-button-small uk-margin-small-right"
                        href="/sectores/show/1"
                      >
                        <span
                          href="#"
                          uk-icon="icon:  chevron-right; ratio: 1.2"
                        >
                          {" "}
                        </span>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      }
      aside={<Aside />}
    />
  );
}

export default ListSectores;

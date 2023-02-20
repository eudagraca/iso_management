import React from "react";
import { Link } from "react-router-dom";

export const normaHeader = [
  {
    name: "NORMA",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "DESCRIÇÃO",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "CATEGORIA",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "ACÇÃO",
    selector: (row) => row.type,
    sortable: false,
    cell: (d) => (
      <p>
        <a
          className="uk-button uk-text-capitalize uk-button-small uk-margin-small-right"
          href="/normas"
        >
          <span uk-icon="icon: file-text; ratio: 1.2 "></span>
        </a>

        <Link
          className="uk-button uk-text-capitalize uk-button-small uk-margin-small-right"
          to="/viewPdf"
          state={d}
        >
          <span uk-icon="icon: file-pdf; ratio: 1.2"></span>
        </Link>
      </p>
    ),
  },

];


export const usersHeader = [
    {
      name: "NOME",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "USUÁRIO",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "FUNÇÃO",
      selector: (row) => row.role,
      sortable: true,
    },{
      name: "ULTIMO ACESSO",
      selector: (row) => row.last_login,
      sortable: true,
    },
    {
      name: "DETALHES",
      selector: (row) => row.type,
      sortable: false,
      cell: (d) => (
        <p>
          <Link
            className="uk-button uk-text-capitalize uk-button-small uk-margin-small-right"
            to="#"
            state={d}
          >
            <span uk-icon="icon: arrow-right; ratio: 1.2"></span>
          </Link>
        </p>
      ),
    },
];  

export default function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [day, month, year, ].join('-');
  }
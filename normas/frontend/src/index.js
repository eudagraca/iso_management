import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppRoutes } from './Routes';
import $ from "jquery";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AppRoutes>
    <App />
  </AppRoutes>
);

// $(document).ready(function () {
//   $("#generic-table").DataTable({
//     language: {
//       url: "/javascripts/datatable/language.json",
//     },
//   });
// });




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

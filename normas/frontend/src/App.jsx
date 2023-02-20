
   
import React from "react";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
function App() {
  return <Layout header={<Header />} content={<Dashboard />} aside={<Aside />} />
}

export default App;
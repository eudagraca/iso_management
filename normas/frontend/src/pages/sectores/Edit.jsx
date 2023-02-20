import { useState } from "react";
import { useLocation } from "react-router-dom";
import Aside from "../../components/Aside";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Layout from "../Layout";

function EditSectorLayout() {
  const location = useLocation();
  const data = location.state;
  const [name, setName] = useState();
  const [user, setUser] = useState();


  console.log(data);
  return (
    <div className="uk-background-default uk-padding">
      <h3 className="h3 mb-3 uk-text-bold uk-margin-medium-left uk-margin-top">
        Registo de sector
      </h3>
      <form
        className="uk-form-stacked uk-width-1-1@s uk-margin-large-top uk-margin-medium-right"
        method="POST"
        action="/sectores"
      >
        <div className="uk-width-1-1@s uk-grid">
          <div className="uk-margin uk-width-1-2@s uk-padding-remove-right">
            <label className="uk-form-label" for="name">
              Nome do sector {data.name}
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                placeholder="Nome"
                name="name"
                id="name"
                type="text"
                defaultValue={data.name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="uk-margin-remove-top uk-width-1-2@s  uk-padding-remove-right">
            <label className="uk-form-label" for="user">
              Responsavel
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                placeholder="Responsavel"
                name="user"
                id="user"
                defaultValue={data.users ? data.users[0].first_name : ""}
                type="text"
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <input
                className="uk-input"
                placeholder="Nome"
                name="user_id"
                id="user_id"
                type="text"
                value={data.users ? data.users[0].id : 0}
                hidden
                required
              />
            </div>
          </div>
          <div className="uk-width-1-1@s uk-padding-remove">
            <Button text="Registar" direction="uk-align-right" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default function EditSector() {
  return (
    <Layout
      header={<Header />}
      content={<EditSectorLayout />}
      aside={<Aside />}
    />
  );
}

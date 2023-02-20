import { useEffect, useState } from "react";
import Aside from "../../components/Aside";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { BASE_URL } from "../../utils/utils";
import Layout from "../Layout";
import Select from "react-select";



function SignupLayout() {

  let allSectors = [];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sectorId, setSectorId] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [username, setUserName] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState();
  const [password2, setConfPassword] = useState();
  const [sectors, setSectors] = useState();
  const axios = require("axios").default;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // password, role, username, first_name, last_name, sector_id
    axios
      .post(`${BASE_URL}account/signup`, {
        first_name: first_name,
        last_name: last_name,
        username: username,
        role: role,
        sector_id: sectorId.value,
        confirm_password: password2,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("info", "Novo usuario adicionado");
        window.open("/accounts", "_self");
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const getSectores = async () => {
      try {
        // setIsLoading(true);
        const response = await fetch(`${BASE_URL}sectores`);
        const data = await response.json();

        /* this is an example for new snippet extension make by me xD */
        for (const element of data) {
          allSectors.push({
            value: element.id,
            label:
              element.name 
          });
        }
        setSectors(allSectors);
        // a(false);
      } catch (error) {
        setIsLoading(false);

        console.error(error);
      }
    };
    getSectores();
  });

  return (
    <div className="uk-background-default uk-padding">
      <h3 className="h3 mb-3 uk-text-bold uk-margin-medium-left">
        Criação de usuário
      </h3>
      <form
        className="uk-form-stacked uk-width-1-1@s uk-margin-large-top"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="uk-width-1-1@s uk-grid">
          <div className="uk-margin uk-width-1-3@s uk-padding-remove-right">
            <label className="uk-form-label" htmlFor="first_name">
              Primeiro Nome
            </label>
            <div className="uk-form-controls">
              <input className="uk-input"
                placeholder="Primeiro Nome"
                onChange={(e) => setFirstName(e.target.value)}
                name="first_name"
                id="first_name"
                type="text"
                required
              />
            </div>
          </div>
          <div className="uk-margin-remove-top uk-width-1-3@s  uk-padding-remove-right">
            <label className="uk-form-label" htmlFor="last_name">
              Último nome
            </label>
            <div className="uk-form-controls">
              <input className="uk-input"
                placeholder="Último Nome"
                onChange={(e) => setLastName(e.target.value)}
                name="last_name"
                id="last_name"
                type="text"
                required
              />
            </div>
          </div>
          <div className="uk-margin-bottom uk-width-1-3@s uk-padding-remove-right">
            <label className="uk-form-label" htmlFor="username">
              Nome de usuário
            </label>
            <div className="uk-form-controls">
              <input className="uk-input"
                placeholder="Nome de usuário"
                onChange={(e) => setUserName(e.target.value)}
                name="username"
                id="username"
                required
                type="text"
              />
            </div>
          </div>
          <div className="uk-width-1-3@s uk-padding-remove-right">
            <label className="uk-form-label" htmlFor="role">
              Resposabilidade
            </label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                id="role"
                required
                onChange={(e) => setRole(e.target.value)}
                name="role"
              >
                <option value="">Seleccione uma opção </option>
                <option value="basic">Usuário normal </option>
                <option value="admin">Administrador </option>
                <option value="supervisor">Supervisor </option>
              </select>
            </div>
          </div>
          <div className="uk-width-1-3@s uk-padding-remove-right">
            <label className="uk-form-label" htmlFor="sector_id">
              Sector
            </label>
            <div className="uk-form-controls">
            <Select
                  className="uk-form-select"
                  defaultValue={selectedOption}
                  onChange={setSectorId}
                  options={sectors}
                />
            </div>
          </div>
          <div className="uk-margin-remove-top uk-width-1-3@s  uk-padding-remove-right">
            <label className="uk-form-label" htmlFor="password">
              Senha
            </label>
            <div className="uk-form-controls">
              <input className="uk-input"
                placeholder="Senha de acesso"
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>
          </div>
          <div className="uk-width-1-3@s uk-margin uk-padding-remove-right">
            <label className="uk-form-label" htmlFor="confirm_password">
              Confirmação de senha
            </label>
            <div className="uk-form-controls">
              <input className="uk-input"
                placeholder="Confirmação de senha"
                type="password"
                required
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-margin uk-width-1-1@s uk-padding-remove">
           <Button text="Registar" direction='uk-align-right' />
          </div>
        </div>
      </form>
    </div>
  );
}

export default function Signup() {
  return (
    <Layout header={<Header />} content={<SignupLayout />} aside={<Aside />} />
  );
}

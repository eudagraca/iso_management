import React, { useEffect, useState } from "react";

import Aside from "../../components/Aside";
import Select from "react-select";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Layout from "../Layout";
import { BASE_URL } from "../../utils/utils";
import Spinner from "../../components/Spinner";

function CreateSectorLayout() {
  let allUsers = [];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [name, setName] = useState();
  const [users, setUsers] = useState();
  const axios = require("axios").default;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${BASE_URL}sectores`, {
        user_id: userId.value,
        name: name,
      })
      .then(function (response) {
        localStorage.setItem("info", response.data.title);
        window.open("/sectores", "_self");
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        // setIsLoading(true);
        const response = await fetch(`${BASE_URL}account`);
        const data = await response.json();

        /* this is an example for new snippet extension make by me xD */
        for (const element of data) {
          allUsers.push({
            value: element.id,
            label:
              element.first_name +
              " " +
              element.last_name +
              " - " +
              element.username,
          });
        }
        setUsers(allUsers);
        // setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.error(error);
      }
    };
    getUsers();
  });

  return (
    <>
      {" "}
      {isLoading ? <Spinner /> : ""}
      <div className="uk-background-default uk-padding">
        <h3 className="h3 mb-3 uk-text-bold uk-margin-medium-left uk-margin-top">
          Registo de sector
        </h3>
        <form
          className="uk-form-stacked uk-width-1-1@s uk-margin-large-top uk-margin-medium-right"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="uk-width-1-1@s uk-grid">
            <div className="uk-margin uk-width-1-2@s uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="name">
                Nome do sector
              </label>
              <div className="uk-form-controls">
                <input className="uk-input"
                  placeholder="Nome"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  type="text"
                  required
                />
              </div>
              <p className="uk-text-danger"></p>
            </div>
            <div className="uk-margin-remove-top uk-width-1-2@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Responsavel
              </label>
              <div className="uk-form-controls">
                <Select
                  className="uk-form-select"
                  defaultValue={selectedOption}
                  onChange={setUserId}
                  options={users}
                />
              </div>
            </div>
            <div className="uk-width-1-1@s uk-padding-remove">
              <Button text="Registar" direction="uk-align-right" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default function CreateSector() {
  return (
    <Layout
      header={<Header />}
      content={<CreateSectorLayout />}
      aside={<Aside />}
    />
  );
}

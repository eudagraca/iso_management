import { useState } from "react";
import Aside from "../../components/Aside";
import Header from "../../components/Header";
import { BASE_URL } from "../../utils/utils";
import Layout from "../Layout";
import axios from "axios";
import Spinner from "../../utils/Spinner";

async function createNorma(formData) {
  return await axios.post(
    `${BASE_URL}documentos`,
    formData /* , { headers: { 'Content-Type': 'multipart/form-data' } } */
  );
}

function CreateDocumentLayout() {
  const [sector, setSector] = useState();
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [published, setPublished] = useState();
  const [description, setDescription] = useState();
  const [isoFile, setIsoFile] = useState();
  const [type, setType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const categorias = [
    { value: "IEC", key: "IEC" },
    { value: "ISO", key: "ISO" },
    { value: "BS", key: "BS" },
    { value: "DIN", key: "DIN" },
    { value: "IEEE", key: "IEEE" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSector(user && user.sector.id);
    const sector_id = user && user.sector.id;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("published", published);
    formData.append("code", code);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("sector_id", sector_id);
    formData.append("file_name", isoFile);

    try {
      const response = await createNorma(formData);
    setIsLoading(false);

      window.location.href = "/normas";
      console.log(response);
    } catch (e) {
      console.log(e);
      setIsLoading(false);

      //Alert to be added when error handled

    }
  };

  return (
    <>
      {" "}
      {isLoading ? <Spinner /> : ""}
      <div className="uk-background-default uk-padding">
        <div className="uk-padding-small">
          <h3 className="h3 mb-3 uk-text-bold uk-margin-small-top">
            Registo de norma
          </h3>
          <form
            className="uk-form-stacked uk-width-1-1@s uk-padding-remove-top uk-margin-large-top"
            method="POST"
            onSubmit={handleSubmit}
            encType="multipart/form"
          >
            <div className="uk-width-1-1@s uk-padding-remove uk-grid">
              <div className="uk-margin uk-width-1-2@s uk-padding-remove uk-padding-remove-right">
                <label className="uk-form-label" htmlFor="name">
                  Nome da Norma
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    placeholder="Nome da norma"
                    name="name"
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="uk-margin-remove uk-width-1-4@s  uk-padding-remove-right">
                <label className="uk-form-label" htmlFor="code">
                  Codigo
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    placeholder="Código da norma"
                    name="code"
                    id="code"
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="uk-margin-bottom uk-width-1-4@s">
                <label className="uk-form-label" htmlFor="published">
                  Ano de publicação
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input"
                    min="1900"
                    max="2100"
                    type="number"
                    step="1"
                    placeholder="1999"
                    required
                    name="published"
                    id="published"
                    onChange={(e) => setPublished(e.target.value)}
                    autoComplete="false"
                  />
                </div>
              </div>
              <div className="uk-margin-bottom uk-padding-remove-left uk-width-1-4@s">
                <label className="uk-form-label" htmlFor="published">
                  Categoria da norma
                </label>
                <select
                  className="uk-select uk-margin-small-top"
                  name="type"
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Por favor seleccione...</option>
                  {categorias.map(function (value, key) {
                    return (
                      <option key={key} index={value.value} value={value.key}>
                        {value.value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="uk-margin-remove uk-padding-remove-left uk-padding-remove-right uk-width-1-4@s">
                <label className="uk-form-label" htmlFor="sector">
                  Sector {user&& user.first_name}
                </label>
                <div className="uk-form-controls  uk-margin-small-top">
                  <input
                    className="uk-input"
                    placeholder="Nome do Sector"
                    id="sector"
                    defaultValue={user.sector ? user.sector.name : ''}
                    type="text"
                    readOnly
                  />
                  <input
                    className="uk-input"
                    placeholder="Sector ID"
                    name="sector_id"
                    id="sector_id"
                    defaultValue={user.sector && user.sector.id}
                    onChange={(e) => setSector(e.target.value)}
                    type="text"
                    hidden
                  />
                </div>
              </div>
              <div className="uk-margin">
                <span className="uk-text-middle uk-text-normal">
                  Selecione a norma que deseja guardar
                </span>
                <div className="uk-form-custom">
                  <input
                    className="uk-input"
                    type="file"
                    required
                    id="file"
                    name="file_name"
                    accept="application/pdf"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setIsoFile(file);
                    }}
                  />
                  <span className="uk-link uk-margin-small-right">
                    &nbsp;Seleccionar
                  </span>
                </div>
              </div>
              <div className="uk-width-1-1@s uk-padding-remove-left uk-border-rounded">
                <label className="uk-form-label" htmlFor="description">
                  Designação
                </label>
                <div className="uk-form-controls">
                  <textarea
                    className="uk-textarea"
                    rows="3"
                    id="description"
                    required
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="uk-margin uk-width-1-1@s">
                <button
                  className="uk-button uk-button-secondary uk-align-right"
                  type="submit"
                >
                  Registar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function CreateDocument() {
  return (
    <Layout
      header={<Header />}
      content={<CreateDocumentLayout />}
      aside={<Aside />}
    />
  );
}

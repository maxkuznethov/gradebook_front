import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";

export default function AddSubject() {
  let navigate = useNavigate();

  const [subject, setSubject] = useState({
    name: "",
    term: "",
    hours: "",
  });

  const { name, term, hours } = subject;

  const onInputChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/subjects/add", subject, { headers: authHeader() });
    navigate("/subjects");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Добавление дисциплины</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Название
              </label>
              <input
                type={"text"}
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Authorname" className="form-label">
                Семестр
              </label>
              <input
                type={"text"}
                className="form-control"
                name="term"
                value={term}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Authorname" className="form-label">
                Количество часов
              </label>
              <input
                  type={"text"}
                  className="form-control"
                  name="hours"
                  value={hours}
                  onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="form-group">
              <button type="submit" style={{backgroundColor: "#19517B", borderColor: "#19517B"}}
                      className="btn btn-primary btn-block w-50 m-auto">Подтвердить
              </button>
            </div>
          </form>
          <div className="m-auto text-center form-group">
            <Link to={"/subjects"} className="card-link p-0">
              Назад
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import authHeader from "../../services/auth-header";

export default function EditTeacher() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [teacher, setTeacher] = useState({
    id: id,
    name: "",
    position: "",
  });

  const { name, position } = teacher;

  const onInputChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

 /* useEffect(() => {
    loadTeacher();
  }, []);*/

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://gradebook-backend.onrender.com/api/teachers/edit`, teacher, { headers: authHeader() });
    navigate("/teachers");
  };

  /*const loadTeacher = async () => {
    const result = await axios.get(`http://localhost:8080/api/books/${id}`, { headers: authHeader() });
    setTeacher(result.data);
  };*/

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Изменение Преподавателя</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                ФИО
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
                Должность
              </label>
              <input
                  type={"text"}
                  className="form-control"
                  name="position"
                  value={position}
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
            <Link to={"/teachers"} className="card-link p-0">
              Назад
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

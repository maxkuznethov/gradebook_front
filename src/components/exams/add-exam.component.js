import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";

export default function AddExam() {
  let navigate = useNavigate();

  const [exam, setExam] = useState({
    student: "",
    subject: "",
    teacher: "",
    mark: "",
    date: "",
  });

  const { student, subject, teacher, mark, date } = exam;

  const onInputChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://gradebook-backend.onrender.com/api/exams/add", exam, { headers: authHeader() });
    navigate("admin/exams");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Добавление оценки</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Идентификатор студента
              </label>
              <input
                type={"text"}
                className="form-control"
                name="student"
                value={student}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Authorname" className="form-label">
                Идентификатор предмета
              </label>
              <input
                type={"text"}
                className="form-control"
                name="subject"
                value={subject}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Authorname" className="form-label">
                Идентификатор преподавателя
              </label>
              <input
                  type={"text"}
                  className="form-control"
                  name="teacher"
                  value={teacher}
                  onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Authorname" className="form-label">
                Оценка
              </label>
              <input
                  type={"text"}
                  className="form-control"
                  name="mark"
                  value={mark}
                  onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Authorname" className="form-label">
                Дата
              </label>
              <input
                  type={"text"}
                  className="form-control"
                  name="date"
                  value={date}
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

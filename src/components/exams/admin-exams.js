import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";

export default function AdminExams() {
    const [exams, setExams] = useState([]);


    const API_URL = 'https://gradebook-backend.onrender.com/api/exams';

    useEffect(() => {

        loadExams();
    }, []);

    const loadExams = async () => {

        const result = await axios.get(API_URL, {headers: authHeader()});
        setExams(result.data);

    };

    const deleteExam = async (id) => {
        await axios.delete(`http://localhost:8080/api/exams/delete/${id}`, { headers: authHeader() });
        loadExams();
    };


    return (
        <div className="container">
            <div className="py-4">

                    <Link className="btn btn-outline-dark" to="/admin/exams/add">
                        Добавить оценку
                    </Link>
                    <hr/>


                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Студент</th>
                            <th scope="col">Наименование дисциплины</th>
                            <th scope="col">Семестр</th>
                            <th scope="col">Часы</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Преподаватель</th>
                            <th scope="col">Дата</th>
                            <th scope="col"></th>

                        </tr>
                        </thead>
                        <tbody>
                        {exams.map((exam) => (
                            <tr>
                                <td>{exam.id}</td>
                                <td>{exam.student}</td>
                                <td>{exam.subject}</td>
                                <td>{exam.term}</td>
                                <td>{exam.hours}</td>
                                <td>{exam.mark}</td>
                                <td>{exam.teacher}</td>
                                <td>{exam.date}</td>
                                <td>
                                    <Link
                                        className="btn btn-outline-dark mx-2"
                                        to={`edit/${exam.id}`}
                                    >
                                        Изменить
                                    </Link>
                                </td>


                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            );
            }
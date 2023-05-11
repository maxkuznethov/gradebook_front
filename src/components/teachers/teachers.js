import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import authHeader from "../../services/auth-header";

export default function Teachers() {
    const [teachers, setTeachers] = useState([]);



    const API_URL = 'http://localhost:8080/api/teachers';

    useEffect(() => {
        loadTeachers();
    }, []);

    const loadTeachers = async () => {

        const result = await axios.get(API_URL, {headers: authHeader()});
        setTeachers(result.data);

    };


    return (
        <div className="container">
            <div className="py-4">
                <Link className="btn btn-outline-dark" to="/teachers/add">
                    Добавить преподавателя
                </Link>
                <hr/>

                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ФИО</th>
                        <th scope="col">Должность</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers.map((teacher) => (
                        <tr>
                            <td>{teacher.id}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.position}</td>
                            <td>
                                <Link
                                    className="btn btn-outline-dark mx-2"
                                    to={`/teachers/edit/${teacher.id}`}
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
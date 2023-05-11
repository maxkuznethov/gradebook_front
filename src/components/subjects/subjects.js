import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import authHeader from "../../services/auth-header";

export default function Subjects() {
    const [subjects, setSubjects] = useState([]);

    const {id} = useParams();

    const API_URL = 'http://localhost:8080/api/subjects';

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {

        const result = await axios.get(API_URL, {headers: authHeader()});
        setSubjects(result.data);

    };


    return (
        <div className="container">
            <div className="py-4">
                <Link className="btn btn-outline-dark" to="/subjects/add">
                    Добавить предмет
                </Link>
                <hr/>

                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Семестр</th>
                        <th scope="col">Часы</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {subjects.map((subject) => (
                        <tr>
                            <td>{subject.id}</td>
                            <td>{subject.name}</td>
                            <td>{subject.term}</td>
                            <td>{subject.hours}</td>
                            <td>
                                <Link
                                    className="btn btn-outline-dark mx-2"
                                    to={`/subjects/edit/${subject.id}`}
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
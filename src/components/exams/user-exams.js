import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";

export default function UserExams() {
    const [exams, setExams] = useState([]);

    const id = AuthService.getCurrentUser().id;


    const API_URL = 'https://gradebook-backend.onrender.com/api/exams/get/'+id;

    useEffect(() => {

        loadExams();
    }, []);

    const loadExams = async () => {

        const result = await axios.get(API_URL, {headers: authHeader()});
        setExams(result.data);

    };


    return (
        <div className="container">
            <div className="py-4">

                <hr/>

                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Наименование дисциплины</th>
                        <th scope="col">Семестр</th>
                        <th scope="col">Часы</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Преподаватель</th>
                        <th scope="col">Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams.map((exam) => (
                        <tr>
                            <td>{exam.subject}</td>
                            <td>{exam.term}</td>
                            <td>{exam.hours}</td>
                            <td>{exam.mark}</td>
                            <td>{exam.teacher}</td>
                            <td>{exam.date}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
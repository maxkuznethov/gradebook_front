import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import authHeader from "../services/auth-header";

export default function Admin() {
    const [users, setUsers] = useState([]);

    const {id} = useParams();

    const API_URL = 'https://gradebook-backend.onrender.com/api/users';

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        const result = await axios.get(API_URL, {headers: authHeader()});
        setUsers(result.data);

    };



    return (
        <div className="container">
            <div className="py-4">
                <Link className="btn btn-outline-dark" to="/register">
                    Добавить пользователя
                </Link>
                <hr/>

                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ФИО</th>
                        <th scope="col">Почта</th>
                        <th scope="col">Группа</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.studyGroup}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

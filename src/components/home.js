import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import authHeader from "../services/auth-header";

export default function Home() {
  const [books, setBooks] = useState([]);

  const { id } = useParams();

  const API_URL = 'http://localhost:8080/api/books';

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    
        const result = await axios.get(API_URL, { headers: authHeader() });
        setBooks(result.data);
    
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:8080/api/books/${id}`, { headers: authHeader() });
    loadBooks();
  };

  return (
    <div className="container">
      <div className="py-4">
      <Link className="btn btn-outline-dark" to="/addBook">
            Добавить книгу
          </Link>
        <hr/>
    
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Имя автора</th>
              <th scope="col">Издатель</th>
              <th scope="col">Год издания</th>
              <th scope="col">Количество</th>
              <th scope="col">Цена</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                <td>{book.publisher}</td>
                <td>{book.publishYear}</td>
                <td>{book.count}</td>
                <td>{book.price}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editBook/${book.id}`}
                  >
                    Изменить
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteBook(book.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

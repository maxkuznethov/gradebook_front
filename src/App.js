import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";

import EditBook from "./components/teachers/edit-teacher.component";
import EventBus from "./common/EventBus";
import AddBook from "./components/teachers/add-teacher.component";
import Admin from "./components/admin";
import Teachers from "./components/teachers/teachers";
import AddTeacher from "./components/teachers/add-teacher.component";
import EditTeacher from "./components/teachers/edit-teacher.component";
import Subjects from "./components/subjects/subjects";
import AddSubject from "./components/subjects/add-subject.component";
import EditSubject from "./components/subjects/edit-subject.component";
import UserExams from "./components/exams/user-exams";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav style={{backgroundColor: "#19517B"}} className="navbar navbar-expand navbar-dark ">
          <Link to={"/"} className="navbar-brand">
            Электронная зачетная книжка
          </Link>
          <div className="navbar-nav mr-auto ">

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                    Пользователи
                </Link>
              </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Оценки
                  </Link>
                </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/teachers"} className="nav-link">
                    Преподаватели
                  </Link>
                </li>
            )}
            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/subjects"} className="nav-link">
                    Дисциплины
                  </Link>
                </li>
            )}


            {(!showAdminBoard && currentUser) && (
                <li className="nav-item">
                  <Link to={"/exams"} className="nav-link">
                    Оценки
                  </Link>
                </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Выйти
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Войти
                </Link>
              </li>

            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book" element={<BoardUser />} />
            <Route exact path="/editBook/:id" element={<EditBook />} />
            <Route exact path="/addBook" element={<AddBook />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/add" element={<AddTeacher />} />
            <Route path="/teachers/edit/:id" element={<EditTeacher />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/add" element={<AddSubject />} />
            <Route path="/subjects/edit/:id" element={<EditSubject />} />
            <Route path="/exams" element={<UserExams />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

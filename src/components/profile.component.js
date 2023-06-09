import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong>
          </h3>
        </header>
        <p>
          <strong>Идентификатор: </strong>
          {currentUser.id}
        </p>
        <p>
          <strong>Электронная почта: </strong>
          {currentUser.email}
        </p>
       <p> <strong>Роль пользователя: </strong>
         {currentUser.roles.includes("ROLE_ADMIN") ? "Администратор" : "Студент"}
       </p>
          {!currentUser.roles.includes("ROLE_ADMIN") &&
          <p><strong>Группа: </strong> {currentUser.studyGroup}</p>}
      </div>: null}
      </div>

    );
  }
}

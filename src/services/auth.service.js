import axios from "axios";

const API_URL = "https://gradebook-backend.onrender.com/api/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, studyGroup, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            studyGroup,
            password
        });
    }

    getCurrentUser() {
        console.log(JSON.parse(localStorage.getItem('user')))
        return JSON.parse(localStorage.getItem('user'));

    }
}

export default new AuthService();

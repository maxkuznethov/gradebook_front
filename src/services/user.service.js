import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://gradebook-backend.onrender.com/api/exams/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'info');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();

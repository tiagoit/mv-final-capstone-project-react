const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const AuthAPI = {
  login: (email, password) => (
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ email, password }),
    })
  ),
  register: (name, email, password) => (
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ name, email, password }),
    })
  ),
};

export default AuthAPI;

import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [state, setState] = React.useState({ email: '' });

  function handleChange(ev) {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setState({ ...state, [ev.target.name]: value });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(state);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
        <button type="submit">Login</button>
      </form>
      New user? <Link to="/register">Register</Link>
    </div>
  );
}

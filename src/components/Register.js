import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [state, setState] = React.useState({ name: '', email: '' });

  const handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setState({ ...state, [ev.target.name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(state);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={state.name} placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" value={state.email} placeholder="Email" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      Already registered? <Link to="/login">Login</Link>
    </div>
  );
};
export default Register;

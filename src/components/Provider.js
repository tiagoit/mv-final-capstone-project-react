import React from 'react';
import PropTypes from 'prop-types';

export default function Provider(props) {
  const [state, setState] = React.useState({ message: '' });
  const { name, photo } = props;

  function handleChange(ev) {
    setState({ ...state, [ev.target.name]: ev.target.value });
  }

  function handleMessage() {
    console.log(state.message);
  }

  return (
    <div>
      {name}
      <img src={photo} alt={name} />
      <input type="text" name="messsage" onChange={handleChange} />
      <button type="button" onClick={handleMessage}>Send</button>
    </div>
  );
}

Provider.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

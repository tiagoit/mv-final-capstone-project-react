import React from 'react';
import PropTypes from 'prop-types';

export default function Provider(props) {
  const { name, photo } = props;
  return (
    <div>
      {name}
      <img src={photo} alt={name} />
      <button type="button">Message</button>
    </div>
  );
}

Provider.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

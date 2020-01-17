import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import toggleFavouriteAction from '../redux/actions';

const Provider = ({ provider, toggleFavourite }) => {
  const [state, setState] = React.useState({ message: '' });

  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const handleMessage = () => {
    console.log(state.message);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => toggleFavourite(provider.id)}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      {provider.name}
      <img src={provider.photo} alt={provider.name} />
      <input type="text" name="messsage" onChange={handleChange} />
      <button type="button" onClick={handleMessage}>Send</button>
    </div>
  );
};

Provider.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ favourites: state.providers.favourites });
const mapDispatchToProps = (dispatch) => ({
  toggleFavourite: (id) => dispatch(toggleFavouriteAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Provider);

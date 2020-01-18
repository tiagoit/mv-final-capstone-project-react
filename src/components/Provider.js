import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toggleFavouriteAction } from '../redux/actions';

const Provider = ({ provider, rxToggleFavourite, isLoggedIn }) => {
  const [state, setState] = React.useState({ message: '', messageSent: false });

  const handleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const handleMessage = () => {
    setState({ messageSent: true });
  };

  return (
    <div>
      <button type="button" onClick={() => rxToggleFavourite(provider.id)}>
        <FontAwesomeIcon icon={faHeart} />
      </button>
      {provider.name}
      <img src={provider.photo} alt={provider.name} />

      {isLoggedIn && <input type="text" name="messsage" onChange={handleChange} />}
      {isLoggedIn && <button type="button" onClick={handleMessage}>Send</button>}

      {!isLoggedIn && <Link to="/login">Login to message provider</Link>}
      {state.messageSent && <div>Message sent. Await the provider answer!</div>}
    </div>
  );
};

Provider.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  rxToggleFavourite: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  favourites: state.providers.favourites,
  isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = (dispatch) => ({
  rxToggleFavourite: (id) => dispatch(toggleFavouriteAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Provider);

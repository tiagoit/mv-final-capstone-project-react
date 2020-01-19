import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { addFavouriteAction, removeFavouriteAction } from '../redux/actions';

const Provider = ({ isLoggedIn, provider, favourites, rxAddFavourite, rxRemoveFavourite }) => {
  const [state, setState] = React.useState({ message: '', messageSent: false });
  const handleChange = (ev) => setState({ ...state, [ev.target.name]: ev.target.value });
  const handleMessage = () => setState({ messageSent: true, message: '' });

  const toggleFavourite = (id) => {
    if (favourites.includes(id)) {
      rxRemoveFavourite(id);
      fetch(`${process.env.REACT_APP_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('token') },
      });
    } else {
      rxAddFavourite(id);
      fetch(`${process.env.REACT_APP_API_URL}/favourites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
        body: JSON.stringify({ id }),
      });
    }
  };

  const messageForm = (
    <span>
      {isLoggedIn && <input type="text" name="message" value={state.message} onChange={handleChange} />}
      {isLoggedIn && <button type="button" onClick={handleMessage}>Send</button>}
      {state.messageSent && <span>Message sent. Await the provider answer!</span>}
    </span>
  );

  const secondary = isLoggedIn ? messageForm : (<Link to="/login">Login to message</Link>);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={provider.name} src={provider.photo} />
      </ListItemAvatar>
      <ListItemText
        primary={provider.name}
        secondary={secondary}
      />
      {isLoggedIn && (
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={() => toggleFavourite(provider.id)}
          color="inherit"
        >{favourites.includes(provider.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      )}
    </ListItem>
  );
};

Provider.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  rxAddFavourite: PropTypes.func.isRequired,
  rxRemoveFavourite: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  favourites: state.providers.favourites,
  isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = (dispatch) => ({
  rxAddFavourite: (id) => dispatch(addFavouriteAction(id)),
  rxRemoveFavourite: (id) => dispatch(removeFavouriteAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Provider);

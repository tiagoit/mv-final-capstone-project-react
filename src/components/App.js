import React from 'react';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Container, Box, Button, Toolbar, Typography, IconButton, Link, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './App.scss';
import CategoriesList from './CategoriesList';
import ServicesList from './ServicesList';
import Login from './Login';
import Register from './Register';
import Favourites from './Favourites';
import { logoutAction, loginAction } from '../redux/actions';

const App = ({ isLoggedIn, user, rxLogin, rxLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  if (!isLoggedIn && localStorage.getItem('token')) {
    rxLogin({
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
    });
  }

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    rxLogout();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="user-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{isLoggedIn && user.name}</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            <Link component={RouterLink} to="/" color="inherit">Providers directory</Link>
          </Typography>
          {!isLoggedIn && <Button color="inherit" component={RouterLink} to="/login">Login</Button>}
          {!isLoggedIn && <Button color="inherit" component={RouterLink} to="/register">New user</Button>}

          {isLoggedIn && (
            <IconButton
              edge="end"
              aria-label="favourite providers"
              aria-controls="user-menu"
              aria-haspopup="false"
              color="inherit"
              component={RouterLink}
              to="/favourites"
            ><FavoriteIcon />
            </IconButton>
          )}
          {isLoggedIn && (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            ><AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {isLoggedIn && renderMenu}

      <Container maxWidth="sm">
        <Box my={4}>
          <Switch>
            <Route exact path="/favourites"><Favourites /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/register"><Register /></Route>
            <Route path="/category/:category"><ServicesList /></Route>
            <Route exact path="/"><CategoriesList /></Route>
          </Switch>
        </Box>
      </Container>
    </div>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  rxLogin: PropTypes.func.isRequired,
  rxLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn, user: state.auth.user });
const mapDispatchToProps = (dispatch) => ({
  rxLogin: (user) => dispatch(loginAction(user)),
  rxLogout: () => dispatch(logoutAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

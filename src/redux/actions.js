import { LOGIN, LOGOUT, ADD_FAVOURITE, REMOVE_FAVOURITE } from './actionTypes';

export const addFavouriteAction = id => ({
  type: ADD_FAVOURITE,
  payload: { id },
});

export const removeFavouriteAction = id => ({
  type: REMOVE_FAVOURITE,
  payload: { id },
});

export const loginAction = user => ({
  type: LOGIN,
  payload: { user },
});

export const logoutAction = () => ({
  type: LOGOUT,
});

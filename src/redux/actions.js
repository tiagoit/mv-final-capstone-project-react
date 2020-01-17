import { LOGIN, TOGGLE_FAVOURITE } from './actionTypes';

export const toggleFavouriteAction = id => ({
  type: TOGGLE_FAVOURITE,
  payload: { id },
});

export const loginAction = user => ({
  type: LOGIN,
  payload: { user },
});

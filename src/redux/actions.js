import TOGGLE_FAVOURITE_PROVIDER from './actionTypes';

const toggleFavouriteProvider = id => ({
  type: TOGGLE_FAVOURITE_PROVIDER,
  payload: { id },
});
export default toggleFavouriteProvider;

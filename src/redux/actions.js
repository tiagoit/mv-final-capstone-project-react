import TOGGLE_FAVOURITE from './actionTypes';

const toggleFavouriteAction = id => ({
  type: TOGGLE_FAVOURITE,
  payload: { id },
});
export default toggleFavouriteAction;

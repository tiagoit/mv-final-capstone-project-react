import { ADD_FAVOURITE, REMOVE_FAVOURITE } from '../actionTypes';

const initialState = {
  favourites: [],
};

export default function (state = initialState, action) {
  let newFavourites;
  switch (action.type) {
    case ADD_FAVOURITE: {
      console.log('add', action);
      const { id } = action.payload;
      newFavourites = [...state.favourites, id];
      return { ...state, favourites: newFavourites };
    }
    case REMOVE_FAVOURITE: {
      console.log('remove', action);
      const { id } = action.payload;
      const favIdx = state.favourites.indexOf(id);
      newFavourites = [...state.favourites.slice(0, favIdx),
        ...state.favourites.slice(favIdx + 1, state.favourites.length)];
      return { ...state, favourites: newFavourites };
    }
    default:
      return state;
  }
}

import TOGGLE_FAVOURITE_PROVIDER from '../actionTypes';

const initialState = {
  favourites: [],
  loggedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE_PROVIDER: {
      const { id } = action.payload;
      let newFavourites;
      if (state.favourites.includes(id)) {
        const favIdx = state.favourites.indexOf(id);
        newFavourites = [...state.favourites.slice(0, favIdx),
          ...state.favourites.slice(favIdx + 1, state.favourites.length)];
      } else {
        newFavourites = [...state.favourites, id];
      }
      return {
        ...state,
        favourites: newFavourites,
      };
    }
    default:
      return state;
  }
}

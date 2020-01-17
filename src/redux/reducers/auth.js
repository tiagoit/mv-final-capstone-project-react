import { LOGIN, LOGOUT } from '../actionTypes';

const initialState = {
  user: {},
  isLoggedIn: false,
};

export default function (state = initialState, action) {
  console.log('REDUCER: auth: ', { action });

  const { user } = action.payload || {};
  switch (action.type) {
    case LOGIN:
      return { ...state, user, isLoggedIn: true };
    case LOGOUT:
      return { ...state, user: {}, isLoggedIn: false };
    default:
      return state;
  }
}

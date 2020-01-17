import { LOGIN, REGISTER } from '../actionTypes';

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  console.log('REDUCER: auth: ', { action });
  const { user } = action.payload || {};
  switch (action.type) {
    case REGISTER:
      return { ...state, user };
    case LOGIN:
      return { ...state, user };
    default:
      return state;
  }
}

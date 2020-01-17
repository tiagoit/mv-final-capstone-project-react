import { combineReducers } from 'redux';
import providers from './providers';
import auth from './auth';

export default combineReducers({ providers, auth });

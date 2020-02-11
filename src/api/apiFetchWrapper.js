import store from '../redux/store';
import { logoutAction } from '../redux/actions';

function handleResponse(response) {
  if (response.ok) return response.status !== 204 ? response.json() : true;
  if (response.statusText === 'Unauthorized') {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    store.dispatch(logoutAction());
    return true;
  }
  return false;
}

const apiFetchWrapper = (url, options) => fetch(url, options).then(handleResponse);

export default apiFetchWrapper;

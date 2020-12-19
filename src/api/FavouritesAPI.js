import apiFetchWrapper from './apiFetchWrapper';

const API_URL = process.env.REACT_APP_API_URL;

const FavouritesAPI = {
  getFavourites: () => (
    apiFetchWrapper(`${API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
  ),
  addFavourite: (id) => (
    apiFetchWrapper(`${API_URL}/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ id }),
    })
  ),
  removeFavourite: (id) => (
    apiFetchWrapper(`${API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('token') },
    })
  ),
};

export default FavouritesAPI;

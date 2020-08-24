const API_KEY = 'aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5';
const METHOD = 'GET';
const BASE_URL = 'https://api.unsplash.com/';

const headers = new Headers({
  'Accept-Version': 'v1',
  Authorization: `Client-ID ${API_KEY}`,
});

const requestParams = {
  method: METHOD,
  headers,
};

export const searchUser = async ({ user = '', page = 1, per_page = 10 }) => {
  const data = await fetch(`${BASE_URL}/search/users?query=${user}&page=${page}&per_page=${per_page}`, requestParams);
  return data.json();
};

export const loadPhotos = async ({ url }) => {
  const data = await fetch(`${url}?per_page=50`, requestParams);
  return data.json();
};

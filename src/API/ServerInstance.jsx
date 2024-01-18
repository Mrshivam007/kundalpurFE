import { backendApiUrl } from '../config/config';

export const serverInstance = (path, method = 'get', payload, token) => {
  let headers = {
    'Content-Type': 'application/json', 
   
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  };
  return new Promise((resolve, reject) => {
    let fetchOptions = {
      method,
      headers,
    };
    if (payload) fetchOptions.body = JSON.stringify(payload);
    fetch(backendApiUrl + path, fetchOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

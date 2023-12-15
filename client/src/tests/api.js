// client/src/tests/api.js
import axios from 'axios';

export function join(name, id, password, role) {
  return axios.post('http://localhost:4000/api/join', { name, id, password, role });
}

export const joinRequest = (data) => {
  return axios.post('http://localhost:4000/api/join', data);
};
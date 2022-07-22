import axios from "axios"

const baseUrl = "https://frontend-test-assignment-api.abz.agency/api/v1"

export const getUsers = async (count, offset) => {
  const res = await axios.get(`${baseUrl}/users?count=${count}&offset=${offset}`);
  const data = await res.data;
  return data;
}

export const getPositions = async () => {
  const res = await axios.get(`${baseUrl}/positions`);
  const data = await res.data;
  return data;
}

export const addUser = async (user) => {
  const tokenRes = await axios.get(`${baseUrl}/token`);
  const token = await tokenRes.data;
  const res = await axios.post(`${baseUrl}/users`, user, {
    headers: { 'content-type': 'multipart/form-data', 'Token': token.token }
  });
}
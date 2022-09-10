import { createOptions, makeRequest, METHOD_GET, METHOD_POST } from "./util";
const USERS = `users`;

export const registerUser = async (userName, password) => {
  const user = {
    username: userName,
    password,
  };

  const options = createOptions(METHOD_POST, null, { user });
  const data = await makeRequest(`${USERS}/register`, options);

  return data.token;
};

export const login = async (userName, password) => {
  const user = {
    username: userName,
    password,
  };

  const options = createOptions(METHOD_POST, null, { user });
  const data = await makeRequest(`${USERS}/login`, options);

  return data.token;
};

export const downloadUser = async (token) => {
  const options = createOptions(METHOD_GET, token);
  const data = await makeRequest(`${USERS}/me`, options);

  return data;
};

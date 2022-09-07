import { BASE_URL, GENERAL_TECHNICAL_ERROR } from "./constants";
import { createHeaders } from "./util";
const USERS = `${BASE_URL}users`;

export const registerUser = async (userName, password) => {
  const options = {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify({
      user: {
        username: userName,
        password,
      },
    }),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(`${BASE_URL + USERS}/register`, options);
    const serverResponse = await httpResponse.json();
    console.log(serverResponse);

    const { data, error } = serverResponse;

    if (error) {
      serverError = error;
      serverError = Error(error.message);
    } else if (data) {
      return data.token;
    }
  } catch (error) {
    console.error(error);
    throw GENERAL_TECHNICAL_ERROR;
  } finally {
    if (serverError) throw serverError;
  }
};

export const login = async (userName, password) => {
  const options = {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify({
      user: {
        username: userName,
        password,
      },
    }),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(`${USERS}/login`, options);
    const serverResponse = await httpResponse.json();
    console.log(serverResponse);

    const { data, error } = serverResponse;

    if (error) {
      serverError = error;
      serverError = Error(error.message);
    } else if (data) {
      return data.token;
    }
  } catch (error) {
    console.error(error);
    throw GENERAL_TECHNICAL_ERROR;
  } finally {
    if (serverError) throw serverError;
  }
};

export const downloadUser = async (token) => {
  const options = {
    method: "GET",
    headers: createHeaders(token),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(`${USERS}/me`, options);
    const serverResponse = await httpResponse.json();
    console.log(serverResponse);

    const { data, error } = serverResponse;

    if (error) {
      serverError = error;
      serverError = Error(error.message);
    } else if (data) {
      return data;
    }
  } catch (error) {
    console.error(error);
    throw GENERAL_TECHNICAL_ERROR;
  } finally {
    if (serverError) throw serverError;
  }
};

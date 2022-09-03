import { isStringEmpty } from "../util";

const COHORT = `2206-ftb-pt-web-pt`;
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT}/`;
const POSTS = `posts`;
const USERS = `users`;

const GENERAL_TECHNICAL_ERROR = Error("Error connecting to server");

const headers = {
  "Content-Type": `application/json`,
  setAuthToken: (token) => {
    this["Authorization"] = `Bearer ${token}`;
  },
};

const authHeaders = (token) => {
  return {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${token}`,
  };
};

export const downloadPosts = async () => {
  let serverError = null;

  try {
    const httpResponse = await fetch(BASE_URL + POSTS);
    const serverResponse = await httpResponse.json();

    const { data, error } = serverResponse;

    if (error) {
      serverError = Error(error.message);
    } else if (data) {
      return data.posts;
    }
  } catch (error) {
    console.error(error);
    throw GENERAL_TECHNICAL_ERROR;
  } finally {
    if (serverError) throw serverError;
  }
};

export const registerUser = async (userName, password) => {
  const options = {
    method: "POST",
    headers,
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
    headers,
    body: JSON.stringify({
      user: {
        username: userName,
        password,
      },
    }),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(`${BASE_URL + USERS}/login`, options);
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
    headers: authHeaders(token),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(`${BASE_URL + USERS}/me`, options);
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

export const createPost = async (
  token,
  title,
  description,
  price,
  location = "[On Request]",
  willDeliver = false
) => {
  const options = {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        location: !isStringEmpty(location) ? location : "[On Request]",
        willDeliver,
      },
    }),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(BASE_URL + POSTS, options);
    const serverResponse = await httpResponse.json();
    console.log(serverResponse);

    const { data, error } = serverResponse;

    if (error) {
      serverError = error;
      serverError = Error(error.message);
    } else if (data) {
      return data.post;
    }
  } catch (error) {
    console.error(error);
    throw GENERAL_TECHNICAL_ERROR;
  } finally {
    if (serverError) throw serverError;
  }
};

export const deletePost = async (token, postId) => {
  const options = {
    method: "DELETE",
    headers: authHeaders(token),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(`${BASE_URL + POSTS}/${postId}`, options);
    const serverResponse = await httpResponse.json();
    console.log(serverResponse);

    const { error } = serverResponse;

    if (error) {
      serverError = error;
      serverError = Error(error.message);
    }
  } catch (error) {
    console.error(error);
    throw GENERAL_TECHNICAL_ERROR;
  } finally {
    if (serverError) throw serverError;
  }
};

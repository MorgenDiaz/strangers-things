import { BASE_URL, GENERAL_TECHNICAL_ERROR } from "./constants";
import { createHeaders } from "./util";
import { isStringEmpty } from "../../util";

const POSTS = `${BASE_URL}/posts`;

export const downloadPosts = async () => {
  let serverError = null;

  try {
    const httpResponse = await fetch(POSTS);
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
    headers: createHeaders(token),
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
    const httpResponse = await fetch(POSTS, options);
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
    headers: createHeaders(token),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(`${POSTS}/${postId}`, options);
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

export const sendMessage = async (token, postId, message) => {
  const options = {
    method: "POST",
    headers: createHeaders(token),
    body: JSON.stringify({
      message: {
        content: message,
      },
    }),
  };

  let serverError = null;

  try {
    const httpResponse = await fetch(`${POSTS}/${postId}/messages`, options);
    const serverResponse = await httpResponse.json();
    console.log(serverResponse);

    const { data, error } = serverResponse;

    if (error) {
      serverError = error;
      serverError = Error(error.message);
    } else if (data) {
      console.log(data.message);
      return data.message;
    }
  } catch (error) {
    console.error(error);
    throw GENERAL_TECHNICAL_ERROR;
  } finally {
    if (serverError) throw serverError;
  }
};

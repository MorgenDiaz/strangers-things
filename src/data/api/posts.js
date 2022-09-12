import {
  METHOD_DELETE,
  METHOD_GET,
  METHOD_PATCH,
  METHOD_POST,
  createOptions,
  makeRequest,
} from "./util";
import { isStringEmpty } from "../../util";

const POSTS = `posts`;

export const downloadPosts = async (token) => {
  const options = createOptions(METHOD_GET, token);
  const data = await makeRequest(POSTS, options);
  return data.posts;
};

export const createPost = async (
  token,
  title,
  description,
  price,
  location = "[On Request]",
  willDeliver = false
) => {
  const post = {
    title,
    description,
    price,
    location: !isStringEmpty(location) ? location : "[On Request]",
    willDeliver,
  };

  const options = createOptions(METHOD_POST, token, { post });
  const data = await makeRequest(POSTS, options);
  return data.post;
};

export const updatePost = async (
  token,
  _id,
  title,
  description,
  price,
  location = "[On Request]",
  willDeliver = false
) => {
  const post = {
    title,
    description,
    price,
    location: !isStringEmpty(location) ? location : "[On Request]",
    willDeliver,
  };

  const options = createOptions(METHOD_PATCH, token, { post });
  const data = await makeRequest(`${POSTS}/${_id}`, options);

  return data.post;
};

export const deletePost = async (token, _id) => {
  const options = createOptions(METHOD_DELETE, token);
  await makeRequest(`${POSTS}/${_id}`, options);
};

export const sendMessage = async (token, postId, messageContent) => {
  const message = {
    content: messageContent,
  };

  const options = createOptions(METHOD_POST, token, { message });
  const data = await makeRequest(`${POSTS}/${postId}/messages`, options);
  return data.message;
};

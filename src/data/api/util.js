import { BASE_URL, GENERAL_TECHNICAL_ERROR } from "./constants";

export const METHOD_GET = "GET";
export const METHOD_POST = "POST";
export const METHOD_PATCH = "PATCH";
export const METHOD_DELETE = "DELETE";

const createHeaders = (token) => {
  const headers = { "Content-Type": `application/json` };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const createOptions = (method, token, body) => {
  const options = {
    method,
    headers: createHeaders(token),
  };

  if (body) {
    options["body"] = JSON.stringify(body);
  }

  return options;
};

export const makeRequest = async (endpoint, options) => {
  let serverError = null;

  try {
    const httpResponse = await fetch(BASE_URL + endpoint, options);
    const serverResponse = await httpResponse.json();

    const { success, data, error } = serverResponse;

    if (error) {
      serverError = error;
      serverError = Error(error.message);
    } else if (data) {
      return data;
    }

    return success;
  } catch (error) {
    console.error(error);
    throw GENERAL_TECHNICAL_ERROR;
  } finally {
    if (serverError) throw serverError;
  }
};

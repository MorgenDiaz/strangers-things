const COHORT = `2206-ftb-pt-web-pt`;
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT}/`;
const POSTS = `posts`;
const USERS = `users`;
const REGISTER = `register`;

const GENERAL_TECHNICAL_ERROR = Error("Error connecting to server");

const headers = {
  "Content-Type": `application/json`,
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
    const httpResponse = await fetch(
      `${BASE_URL + USERS}/${REGISTER}`,
      options
    );
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

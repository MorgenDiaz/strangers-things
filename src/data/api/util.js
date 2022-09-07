export const createHeaders = (token) => {
  const headers = { "Content-Type": `application/json` };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

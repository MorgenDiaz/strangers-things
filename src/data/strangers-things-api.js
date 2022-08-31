const COHORT = `2206-ftb-pt-web-pt`;
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT}/`;
const POSTS = `posts`;

const downloadPosts = async () => {
  try {
    const response = await fetch(BASE_URL + POSTS);
    const data = await response.json();
    const posts = data.data.posts;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export { downloadPosts };

import { downloadPosts, createPost } from "../data/strangers-things-api";
import { useLocalStorage } from "../data/local-storage";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "./Post";
import { CreatePost } from "./CreatePost";

const download = async (setPosts) => {
  const data = await downloadPosts();

  console.log(data);
  setPosts(data);
};

const addPost = async (
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  try {
    const data = await createPost(
      token,
      title,
      description,
      price,
      location,
      willDeliver
    );

    console.log(data);
  } catch (error) {
    alert(error);
  }
};

const Posts = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    download(setPosts);
  }, [user]);

  const handlePostCreated = async (
    title,
    description,
    price,
    location,
    willDeliver
  ) => {
    console.log(title, description, price, location, willDeliver);
    await addPost(user.token, title, description, price, location, willDeliver);
    download(setPosts);
  };

  return (
    <div>
      <CreatePost onPostCreatedHandler={handlePostCreated} />
      <h1>Posts</h1>
      <div className="flex flex-col place-content-evenly content-evenly">
        {posts.map((post) => {
          const { _id, title, author, description, location, price } = post;
          return (
            <Post
              key={_id}
              title={title}
              seller={author.username}
              description={description}
              location={location}
              price={price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Posts;

import { downloadPosts } from "../data/strangers-things-api";
import { useLocalStorage } from "../data/local-storage";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "./Post";

const download = async (setPosts) => {
  const data = await downloadPosts();

  console.log(data);
  setPosts(data);
};

const Posts = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    download(setPosts);
  }, []);

  return (
    <div>
      {user ? <h1>{user.name}</h1> : <Link to={"/login"}>LOGIN</Link>}
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

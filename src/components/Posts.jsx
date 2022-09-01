import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { downloadPosts } from "../data/strangers-things-api";
import { useLocalStorage } from "../data/local-storage";

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
      {posts.map((post) => (
        <h3>{post.title}</h3>
      ))}
    </div>
  );
};

export default Posts;

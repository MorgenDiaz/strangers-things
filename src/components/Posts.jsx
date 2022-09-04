import {
  downloadPosts,
  createPost,
  sendMessage,
} from "../data/strangers-things-api";
import { useLocalStorage } from "../data/local-storage";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "./Post";
import { CreatePost } from "./CreatePost";
import { CreateMessage } from "./CreateMessage";

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
  const [isCreateMessageDisplaying, setIsCreateMessageDisplaying] =
    useState(false);
  const [messageDetails, setMessageDetails] = useState({});

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

  const handleWriteMessageClicked = (details) => {
    setIsCreateMessageDisplaying(true);
    setMessageDetails(details);
  };

  const handleSendMessageClicked = async (message) => {
    await sendMessage(user.token, messageDetails.postId, message);
    setIsCreateMessageDisplaying(false);
  };

  const handleCancelMessageClicked = () => {
    setIsCreateMessageDisplaying(false);
  };

  return (
    <div className="">
      {isCreateMessageDisplaying && (
        <CreateMessage
          recipient={messageDetails.recipient}
          postId={messageDetails.postId}
          sendMessageHandler={handleSendMessageClicked}
          cancelHandler={handleCancelMessageClicked}
          className="fixed top-1/2 left-2 right-2 transform -translate-y-1/2 h-72"
        />
      )}

      <CreatePost onPostCreatedHandler={handlePostCreated} />
      <h1>Posts</h1>
      <div className="flex flex-col place-content-evenly content-evenly">
        {posts.map((post) => {
          const { _id, title, author, description, location, price } = post;
          return (
            <Fragment key={_id}>
              <Post
                title={title}
                seller={author.username}
                description={description}
                location={location}
                price={price}
              />
              <button
                onClick={() =>
                  handleWriteMessageClicked({
                    postId: _id,
                    recipient: author.username,
                  })
                }
              >
                Send Message
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;

import { downloadPosts, createPost, sendMessage } from "../data/api";
import { useLocalStorage } from "../data/local-storage";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Post } from "../components/Post";
import { CreatePost } from "../components/CreatePost";
import { CreateMessage } from "../components/CreateMessage";

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
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isCreateMessageDisplaying, setIsCreateMessageDisplaying] =
    useState(false);
  const [messageDetails, setMessageDetails] = useState({});

  useEffect(() => {
    download(setPosts);
  }, [user]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

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

  const handleWriteMessageClicked = (postId, recipientName) => {
    setIsCreateMessageDisplaying(true);
    setMessageDetails({ postId, recipientName });
  };

  const handleSendMessageClicked = async (message) => {
    await sendMessage(user.token, messageDetails.postId, message);
    setIsCreateMessageDisplaying(false);
  };

  const handleCancelMessageClicked = () => {
    setIsCreateMessageDisplaying(false);
  };

  const handleSearchChanged = (event) => {
    const search = event.target.value.toLowerCase();
    const searchResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.author.username.toLowerCase().includes(search) ||
        post.description.toLowerCase().includes(search) ||
        post.location.toLowerCase().includes(search) ||
        post.price.toLowerCase().includes(search)
    );

    setFilteredPosts(searchResults);
  };

  return (
    <div className="">
      {isCreateMessageDisplaying && (
        <CreateMessage
          recipient={messageDetails.recipientName}
          postId={messageDetails.postId}
          sendMessageHandler={handleSendMessageClicked}
          cancelHandler={handleCancelMessageClicked}
          className="fixed top-1/2 left-2 right-2 transform -translate-y-1/2 h-72"
        />
      )}

      <CreatePost onPostCreatedHandler={handlePostCreated} />
      <h1>Posts</h1>
      <form className="flex p-2">
        <input
          onChange={handleSearchChanged}
          placeholder="Search Posts..."
          className="grow"
        />
      </form>
      <div className="flex flex-col place-content-evenly content-evenly">
        {filteredPosts.map((post) => {
          const {
            _id,
            title,
            author,
            description,
            location,
            price,
            willDeliver,
          } = post;
          return (
            <Post
              key={_id}
              title={title}
              seller={author.username}
              description={description}
              location={location}
              price={price}
              willDeliver={willDeliver}
              writeMessageClickedHandler={() => {
                handleWriteMessageClicked(_id, author.username);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Posts;

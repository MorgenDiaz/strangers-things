import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { downloadPosts, sendMessage } from "../../data/api";
import { Post } from "./Post";
import { CreateMessage } from "./CreateMessage";
import { AddButton, TextBox } from "../../components";

const download = async (setPosts, token, setIsLoading) => {
  try {
    const data = await downloadPosts(token);
    setPosts(data);
  } catch (error) {
    alert(error.message);
  }

  setIsLoading(false);
};

const Posts = ({ user, setIsLoading }) => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isCreateMessageDisplaying, setIsCreateMessageDisplaying] =
    useState(false);
  const [messageDetails, setMessageDetails] = useState({});

  useEffect(() => {
    setIsLoading(true);
    download(setPosts, user?.token, setIsLoading);
  }, [user, setIsLoading]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleWriteMessageClicked = (postId, recipientName) => {
    setIsCreateMessageDisplaying(true);
    setMessageDetails({ postId, recipientName });
  };

  const handleSendMessageClicked = async (message) => {
    try {
      await sendMessage(user.token, messageDetails.postId, message);
      setIsCreateMessageDisplaying(false);
    } catch (error) {
      alert("There was a problem sending your message.");
    }
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
        />
      )}

      <div className="flex items-center fixed left-0 right-0 h-20 bg-gray-200">
        <form className="flex flex-col grow px-6">
          <TextBox
            onChange={handleSearchChanged}
            placeholder="Search Posts..."
          />
        </form>
      </div>

      <div className="flex flex-col place-content-evenly content-evenly pt-20">
        {filteredPosts.map((post) => {
          const { _id, author } = post;

          return (
            <Post
              key={_id}
              signedIn={user != null}
              post={post}
              writeMessageClickedHandler={() => {
                handleWriteMessageClicked(_id, author.username);
              }}
            />
          );
        })}
      </div>

      {user && <AddButton onClick={() => navigate(`/create`)} />}
      <Outlet />
    </div>
  );
};

export default Posts;

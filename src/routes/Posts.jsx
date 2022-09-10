import { downloadPosts, sendMessage } from "../data/api";
import { useState, useEffect } from "react";
import { Post } from "../components/Post";
import { CreateMessage } from "../components/CreateMessage";
import { Outlet, useNavigate } from "react-router-dom";

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
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isCreateMessageDisplaying, setIsCreateMessageDisplaying] =
    useState(false);
  const [messageDetails, setMessageDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    download(setPosts, user?.token, setIsLoading);
  }, [user]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

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

      <div className="flex items-center fixed left-0 right-0 h-20 bg-background ">
        <form className="flex grow">
          <input
            onChange={handleSearchChanged}
            placeholder="Search Posts..."
            className="grow p-2 mx-4"
          />
        </form>
      </div>
      <div className="flex flex-col place-content-evenly content-evenly pt-16">
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

      {user && (
        <svg
          onClick={() => {
            navigate(`/create`);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="#CCCCCC"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="fixed bottom-2 right-2 w-14 h-14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <Outlet />
    </div>
  );
};

export default Posts;

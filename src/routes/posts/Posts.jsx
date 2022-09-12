import { downloadPosts, sendMessage } from "../../data/api";
import { useState, useEffect } from "react";
import { Post } from "./Post";
import { CreateMessage } from "./CreateMessage";
import { Outlet, useNavigate } from "react-router-dom";
import TextBox from "../../components/TextBox";

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
    console.log("anything?");
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
          className=""
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

      {user && (
        <svg
          onClick={() => {
            navigate(`/create`);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="hsl(240, 5.3%, 26.1%)"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="hsl(240, 5.9%, 90%)"
          className="fixed bottom-2 right-2 w-14 h-14 border-2 border-gray-900 bg-gray-700 rounded-xl"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      )}
      <Outlet />
    </div>
  );
};

export default Posts;

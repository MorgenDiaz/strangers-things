import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { downloadPofile, deleteUserPost, getPostMessages } from "./helpers";
import UserPostList from "./UserPostList";
import UserMessages from "./UserMessages";

const POSTS_TAB = "posts";
const MESSAGES_TAB = "messages";

const UserProfile = ({ user, setIsLoading }) => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState(POSTS_TAB);

  const token = user.token ? user.token : null;
  const STYLE_ACTIVE_TAB = "font-semibold border-b-2 border-gray-600";

  useEffect(() => {
    setIsLoading(true);
    downloadPofile(token, setProfile, setIsLoading);
  }, [token, setIsLoading]);

  const handleEditPostClicked = async (post) => {
    navigate("/create", { state: { post } });
  };

  const handleDeletePostClicked = async (postId) => {
    setIsLoading(true);
    await deleteUserPost(token, postId);
    downloadPofile(token, setProfile, setIsLoading);
  };

  const handlePostsTabClicked = () => {
    setTab(POSTS_TAB);
  };

  const handleMessagesTabClicked = () => {
    setTab(MESSAGES_TAB);
  };

  const renerTabContent = () => {
    switch (tab) {
      case POSTS_TAB:
        return (
          <UserPostList
            posts={profile.posts.filter((post) => post.active)}
            editPostClickedHandler={handleEditPostClicked}
            deletePostClickedHandler={handleDeletePostClicked}
          />
        );
      case MESSAGES_TAB: {
        const postConversations = getPostMessages(profile.messages);

        return (
          <UserMessages
            conversations={postConversations}
            userName={user.name}
          />
        );
      }
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col items-stretch p-4 pt-12">
      <div className="flex justify-evenly mb-4">
        <h1
          onClick={handlePostsTabClicked}
          className={`grow text-lg text-center text-gray-800 pb-2 ${
            tab === POSTS_TAB ? STYLE_ACTIVE_TAB : ""
          }`}
        >
          Posts
        </h1>
        <h1
          onClick={handleMessagesTabClicked}
          className={`grow text-lg text-center text-gray-800 pb-2 ${
            tab === MESSAGES_TAB ? STYLE_ACTIVE_TAB : ""
          }`}
        >
          {" "}
          Messages
        </h1>
      </div>

      {profile && renerTabContent()}
    </div>
  );
};

export default UserProfile;

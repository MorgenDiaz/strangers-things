import { useState } from "react";
import { useEffect } from "react";
import { downloadUser, deletePost } from "../data/api";
import { UserPostList } from "../components/UserPostList";
import { useNavigate } from "react-router-dom";
import Conversation from "../components/Conversation";

const POSTS_TAB = "posts";
const MESSAGES_TAB = "messages";

const downloadPofile = async (token, setProfile, setIsLoading) => {
  try {
    const profileData = await downloadUser(token);
    setProfile(profileData);
  } catch (error) {
    alert(error);
  }

  setIsLoading(false);
};

const groupMessagesByPost = (messages) => {
  const messagesByPosts = {};

  for (let message of messages) {
    if (!messagesByPosts[message.post._id])
      messagesByPosts[message.post._id] = {
        title: message.post.title,
        messages: [],
      };

    messagesByPosts[message.post._id].messages.push({
      sender: message.fromUser.username,
      content: message.content,
    });
  }

  return messagesByPosts;
};

const getPostMessages = (messages) => {
  const postMessages = groupMessagesByPost(messages);

  const conversations = [];

  for (let postId in postMessages) {
    conversations.push(postMessages[postId]);
  }

  return conversations;
};

const UserProfile = ({ user, setIsLoading }) => {
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState(POSTS_TAB);

  const token = user.token ? user.token : null;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    downloadPofile(token, setProfile, setIsLoading);
  }, [token, setIsLoading]);

  const handleEditPostClicked = async (post) => {
    navigate("/create", { state: { post } });
  };

  const handleDeletePostClicked = async (postId) => {
    setIsLoading(true);
    await deletePost(token, postId);
    downloadPofile(token, setProfile, setIsLoading);
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

        console.log(postConversations);
        return (
          <div className="flex flex-col gap-4">
            {postConversations.map((conversation, i) => {
              return (
                <Conversation
                  key={i}
                  title={conversation.title}
                  messages={conversation.messages}
                  accountName={user.name}
                />
              );
            })}
          </div>
        );
      }
      default:
        return;
    }
  };

  const handlePostsTabClicked = () => {
    setTab(POSTS_TAB);
  };

  const handleMessagesTabClicked = () => {
    setTab(MESSAGES_TAB);
  };

  const STYLE_ACTIVE_TAB = "font-semibold border-b-2 border-nav";

  return (
    <div className="flex flex-col items-stretch p-4">
      <div className="flex justify-evenly mb-4">
        <h1
          onClick={handlePostsTabClicked}
          className={`grow text-lg text-center text-text_secondary pb-2 ${
            tab === POSTS_TAB ? STYLE_ACTIVE_TAB : ""
          }`}
        >
          Posts
        </h1>
        <h1
          onClick={handleMessagesTabClicked}
          className={`grow text-lg text-center text-text_secondary pb-2 ${
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

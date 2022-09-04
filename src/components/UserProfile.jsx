import { useState } from "react";
import { useEffect } from "react";
import { useLocalStorage } from "../data/local-storage";
import { downloadUser } from "../data/strangers-things-api";
import { deletePost } from "../data/strangers-things-api";
import { UserPostList } from "./UserPostList";

const downloadPofile = async (token, setProfile) => {
  const profileData = await downloadUser(token);
  setProfile(profileData);
};

export const UserProfile = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [profile, setProfile] = useState({});

  const token = user.token ? user.token : null;

  useEffect(() => {
    downloadPofile(token, setProfile);
  }, [token]);

  const handleDeletePostClicked = async (postId) => {
    await deletePost(token, postId);
    downloadPofile(token, setProfile);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Posts</h1>
      {profile.posts && (
        <UserPostList
          posts={profile.posts.filter((post) => post.active)}
          deletePostClickedHandler={handleDeletePostClicked}
        />
      )}
      <h1>Messages</h1>
      {profile.messages && (
        <div>
          {profile.messages.map((message) => {
            <h2>{message.fromUser.username}</h2>;
            <p>{message.content}</p>;
          })}
        </div>
      )}
    </div>
  );
};

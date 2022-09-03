import { useState } from "react";
import { useEffect } from "react";
import { useLocalStorage } from "../data/local-storage";
import { downloadUser } from "../data/strangers-things-api";
import { deletePost } from "../data/strangers-things-api";

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
    <div className="flex flex-col items-stretch justify-items-start">
      {profile.posts &&
        profile.posts
          .filter((post) => post.active)
          .map((post) => {
            return (
              <div key={post._id} className="bg-overlay p-2 m-2">
                <h2>{post.title}</h2>
                <h2>{post.price}</h2>
                <button
                  onClick={() => {
                    handleDeletePostClicked(post._id);
                  }}
                >
                  DELETE
                </button>
              </div>
            );
          })}
    </div>
  );
};

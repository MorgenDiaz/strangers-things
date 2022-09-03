import { useState } from "react";
import { useEffect } from "react";
import { useLocalStorage } from "../data/local-storage";
import { downloadUser } from "../data/strangers-things-api";

const downloadPofile = async (token, setProfile) => {
  const profileData = await downloadUser(token);
  console.log(profileData);
  setProfile(profileData);
};

export const UserProfile = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [profile, setProfile] = useState({});

  const token = user.token ? user.token : null;

  useEffect(() => {
    downloadPofile(token, setProfile);
  }, [token]);

  return (
    <div className="flex flex-col items-stretch justify-items-start">
      <h1>{user.name ? user.name : "user"}</h1>

      {profile.posts &&
        profile.posts.map((post) => {
          return (
            <div key={post._id} className="bg-overlay p-2 m-2">
              <h2>{post.title}</h2>
              <h2>{post.price}</h2>
            </div>
          );
        })}
    </div>
  );
};

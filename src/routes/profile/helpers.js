import { downloadUser, deletePost } from "../../data/api";

export const downloadPofile = async (token, setProfile, setIsLoading) => {
  try {
    const profileData = await downloadUser(token);
    setProfile(profileData);
  } catch (error) {
    alert(error);
  }

  setIsLoading(false);
};

export const deleteUserPost = async (token, postId) => {
  try {
    await deletePost(token, postId);
  } catch (error) {
    alert(error);
  }
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

export const getPostMessages = (messages) => {
  const postMessages = groupMessagesByPost(messages);

  const conversations = [];

  for (let postId in postMessages) {
    conversations.push(postMessages[postId]);
  }

  return conversations;
};

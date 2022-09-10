import { useState } from "react";
import { isStringEmpty } from "../util";
import { createPost, updatePost } from "../data/api";
import { useLocalStorage } from "../data/local-storage";
import { useNavigate, useLocation } from "react-router-dom";

export const CreatePost = () => {
  const [user, setUser] = useLocalStorage("user", null);

  const post = useLocation().state?.post;

  const [title, setTitle] = useState(post ? post.title : "");
  const [description, setDescription] = useState(post ? post.description : "");
  const [price, setPrice] = useState(post ? post.price : "");
  const [location, setLocation] = useState(post ? post.location : "");
  const [willDeliver, setWillDeliver] = useState(
    post ? post.willDeliver : false
  );

  const navigate = useNavigate();

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

  const onPost = async (title, description, price, location, willDeliver) => {};

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setWillDeliver(false);
  };

  const handleTitleChanged = (event) => {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
  };

  const handleDescriptionChanged = (event) => {
    const inputDescription = event.target.value;
    setDescription(inputDescription);
  };

  const handlePriceChanged = (event) => {
    const inputPrice = event.target.value;
    setPrice(inputPrice);
  };

  const handleLocationChanged = (event) => {
    const inputLocation = event.target.value;
    setLocation(inputLocation);
  };

  const handleWillDeliverChanged = (event) => {
    const inputWillDeliverChecked = event.target.checked;
    setWillDeliver(inputWillDeliverChecked);
  };

  const handleCreatePostClicked = async (event) => {
    event.preventDefault();

    if (
      isStringEmpty(title) ||
      isStringEmpty(description) ||
      isStringEmpty(price)
    )
      return;

    if (post) {
      updatePost(
        user.token,
        post._id,
        title,
        description,
        price,
        location,
        willDeliver
      );
    } else {
      await addPost(
        user.token,
        title,
        description,
        price,
        location,
        willDeliver
      );
    }

    resetForm();
    navigateBack();
  };

  const navigateBack = () => {
    navigate(-1);
  };

  console.log("params are ", post);
  return (
    <div>
      <form onSubmit={handleCreatePostClicked} className="flex flex-col p-4">
        <input
          className="my-2 p-2"
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={handleTitleChanged}
        />
        <textarea
          className="h-20 text-start align-top my-2 p-2"
          placeholder={"Description"}
          value={description}
          onChange={handleDescriptionChanged}
        />
        <input
          className="my-2 p-2"
          type="text"
          placeholder={"Price"}
          value={price}
          onChange={handlePriceChanged}
        />
        <input
          className="my-2 p-2"
          type="text"
          placeholder={"Location"}
          value={location}
          onChange={handleLocationChanged}
        />
        <div className="flex justify-center gap-1 mb-4">
          <label className="font-light" htmlFor="will_deliver">
            Will deliver to buyer
          </label>
          <input
            type="checkbox"
            name="will_deliver"
            id="will_deliver"
            checked={willDeliver}
            onChange={handleWillDeliverChanged}
          />
        </div>
        <button className="font-semibold text-lg" type="submit">
          {post ? "Update Post" : "Create Post"}
        </button>
        <button onClick={navigateBack} className="text-lg">
          Cancel
        </button>
      </form>
    </div>
  );
};

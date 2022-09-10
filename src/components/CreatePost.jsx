import { useState } from "react";
import { createPost, updatePost } from "../data/api";
import { useNavigate, useLocation } from "react-router-dom";

export const CreatePost = ({ user, setIsLoading }) => {
  const originalPost = useLocation().state?.post;
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState(originalPost ? originalPost.title : "");
  const [description, setDescription] = useState(
    originalPost ? originalPost.description : ""
  );
  const [price, setPrice] = useState(originalPost ? originalPost.price : "");
  const [location, setLocation] = useState(
    originalPost ? originalPost.location : ""
  );
  const [willDeliver, setWillDeliver] = useState(
    originalPost ? originalPost.willDeliver : false
  );

  const executePostCommand = async () => {
    try {
      if (originalPost) {
        await updatePost(
          user.token,
          originalPost._id,
          title,
          description,
          price,
          location,
          willDeliver
        );
      } else {
        await createPost(
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
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

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
    setIsLoading(true);
    executePostCommand();
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col pt-12">
      <h1 className="text-2xl text-center uppercase">
        post to stranger's things
      </h1>

      {errorMessage && <p className="mb-2 text-center">{errorMessage}</p>}

      <form onSubmit={handleCreatePostClicked} className="flex flex-col p-4">
        <input
          onChange={handleTitleChanged}
          type="text"
          required
          placeholder={"Title"}
          value={title}
          className="my-2 p-2"
        />
        <textarea
          onChange={handleDescriptionChanged}
          required
          placeholder={"Description"}
          value={description}
          className="h-20 text-start align-top my-2 p-2"
        />
        <input
          onChange={handlePriceChanged}
          type="text"
          required
          placeholder={"Price"}
          value={price}
          className="my-2 p-2"
        />
        <input
          onChange={handleLocationChanged}
          type="text"
          required
          placeholder={"Location"}
          value={location}
          className="my-2 p-2"
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
          {originalPost ? "Update Post" : "Create Post"}
        </button>
        <button onClick={navigateBack} className="text-lg">
          Cancel
        </button>
      </form>
    </div>
  );
};

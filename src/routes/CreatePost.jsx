import { useState } from "react";
import { createPost, updatePost } from "../data/api";
import { useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import TextBox from "../components/TextBox";
import ErrorMessage from "../components/ErrorMessage";
import BigTextBox from "../components/BigTextBox";

const CreatePost = ({ user, setIsLoading }) => {
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
    <div className="flex flex-col pt-12 px-6">
      <h1 className="text-2xl font-semibold self-center text-center text-gray-900 tracking-wide uppercase pb-6">
        post to stranger's things
      </h1>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <form onSubmit={handleCreatePostClicked} className="flex flex-col gap-4">
        <TextBox
          onChange={handleTitleChanged}
          value={title}
          placeholder={"Title"}
          required={true}
        />

        <BigTextBox
          onChange={handleDescriptionChanged}
          placeholder={"Description"}
          required={true}
          value={description}
        />

        <TextBox
          onChange={handlePriceChanged}
          value={price}
          placeholder={"Price"}
          required={true}
        />

        <TextBox
          onChange={handleLocationChanged}
          value={location}
          placeholder={"Location"}
        />
        <div className="flex justify-center gap-2">
          <label className="font-semibold text-gray-900" htmlFor="will_deliver">
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

        <PrimaryButton value={originalPost ? "Update Post" : "Create Post"} />
        <button
          onClick={navigateBack}
          className="uppercase self-center text-gray-800"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

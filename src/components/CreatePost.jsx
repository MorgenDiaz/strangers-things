import { useState } from "react";
import { isStringEmpty } from "../util";

export const CreatePost = ({ onPostCreatedHandler }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

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

  const handleCreatePostClicked = (event) => {
    event.preventDefault();

    if (
      isStringEmpty(title) ||
      isStringEmpty(description) ||
      isStringEmpty(price)
    )
      return;

    onPostCreatedHandler(title, description, price, location, willDeliver);
    resetForm();
  };

  return (
    <div>
      <form onSubmit={handleCreatePostClicked} className="flex flex-col">
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
        <div>
          <label htmlFor="will_deliver">Will deliver to buyer</label>
          <input
            type="checkbox"
            name="will_deliver"
            id="will_deliver"
            onChange={handleWillDeliverChanged}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

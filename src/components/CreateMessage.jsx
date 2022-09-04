import { isStringEmpty } from "../util";
import { useState } from "react";

export const CreateMessage = ({
  className,
  recipient,
  postId,
  sendMessageHandler,
  cancelHandler,
}) => {
  const [message, setMessage] = useState("");

  const onMessageChanged = (event) => {
    const inputMessage = event.target.value;
    setMessage(inputMessage);
  };

  const onSendMessageClicked = () => {
    if (isStringEmpty(message)) return;

    sendMessageHandler(message);
  };

  return (
    <div
      className={`flex flex-col p-2 justify-between bg-navigation ${className}`}
    >
      <h3>{recipient}</h3>
      <textarea
        onChange={onMessageChanged}
        placeholder="Enter message..."
        className="h-48"
      ></textarea>
      <button onClick={onSendMessageClicked}>Send</button>
      <button onClick={cancelHandler}>Cancel</button>
    </div>
  );
};

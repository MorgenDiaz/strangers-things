import { isStringEmpty } from "../util";
import { useState } from "react";
import BigTextBox from "./BigTextBox";
import PrimaryButton from "./PrimaryButton";

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
    <div className="fixed top-1/2 left-2 right-2 transform -translate-y-1/2 flex flex-col gap-2 justify-between bg-gray-200  h-80 py-6 px-4 rounded-md border-2 border-gray-900">
      <h3 className="text-2xl font-semibold self-center text-gray-900 tracking-wide uppercase pb-4">
        {recipient}
      </h3>

      <BigTextBox onChange={onMessageChanged} placeholder="Enter message..." />
      <PrimaryButton onClick={onSendMessageClicked} value="Send" />
      <button onClick={cancelHandler}>Cancel</button>
    </div>
  );
};

import { useState } from "react";
import { isStringEmpty } from "../../util";
import { BigTextBox, PrimaryButton } from "../../components";

export const CreateMessage = ({
  recipient,
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
    <div className="fixed top-1/2 left-2 right-2 transform -translate-y-1/2">
      <form
        onSubmit={onSendMessageClicked}
        className="flex flex-col gap-2 justify-between bg-gray-200  h-80 py-6 px-4 rounded-md border-2 border-gray-900"
      >
        <h3 className="text-2xl font-semibold self-center text-gray-900 tracking-wide uppercase pb-4">
          {recipient}
        </h3>

        <BigTextBox
          onChange={onMessageChanged}
          placeholder="Enter message..."
          required={true}
        />

        <PrimaryButton value="Send" />

        <button
          onClick={cancelHandler}
          className="pt-2 uppercase self-center text-gray-800"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

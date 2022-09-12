const Conversation = ({ title, messages, accountName }) => {
  return (
    <div className="flex flex-col bg-gray-100 p-6 gap-4 rounded-md">
      <p className=" self-center justify-self-end text-xl font-semibold text-gray-900">
        {title}
      </p>
      {messages.map((message, i) => {
        return (
          <div
            key={i}
            className="flex flex-col bg-gray-200 p-2 border rounded-md border-gray-900"
          >
            <p className="justify-self-end text-sm text-gray-900">
              {message.sender}
            </p>
            <p className="font-semibold text-gray-900">{message.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;

const Conversation = ({ title, messages, accountName }) => {
  return (
    <div className="flex flex-col bg-overlay p-6 gap-4">
      <p className="mt-2 self-center justify-self-end text-lg font-semibold">
        {title}
      </p>
      {messages.map((message, i) => {
        return (
          <div key={i} className="flex flex-col bg-navigation p-2">
            <p className="justify-self-end text-sm p-0">{message.sender}</p>
            <p className="font-semibold p-0">{message.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;

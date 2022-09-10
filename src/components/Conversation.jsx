const Conversation = ({ title, messages, accountName }) => {
  return (
    <div className="flex flex-col bg-overlay px-6 py-4 gap-4">
      <p className=" self-center justify-self-end text-xl font-semibold">
        {title}
      </p>
      {messages.map((message, i) => {
        return (
          <div key={i} className="flex flex-col bg-navigation p-2">
            <p className="justify-self-end text-sm ">{message.sender}</p>
            <p className="font-semibold">{message.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;

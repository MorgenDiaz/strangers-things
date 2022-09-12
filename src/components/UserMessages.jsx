import Conversation from "./Conversation";

const UserMessages = ({ conversations, userName }) => {
  return (
    <div className="flex flex-col gap-6 pt-2">
      {conversations.map((conversation, i) => {
        return (
          <Conversation
            key={i}
            title={conversation.title}
            messages={conversation.messages}
            accountName={userName}
          />
        );
      })}
    </div>
  );
};

export default UserMessages;

import SendButton from "../../components/SendButton";

export const Post = ({ signedIn, post, writeMessageClickedHandler }) => {
  const { title, author, description, location, price, willDeliver, isAuthor } =
    post;

  const canMessageSeller = signedIn && !isAuthor;

  return (
    <div className="flex flex-col bg-gray-100 px-6 pt-8 pb-4 border-b border-gray-500">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-text text-xl">{title}</h3>

        <h3 className="justify-self-end text-text text-lg font-bold leading-tight text-right">
          {price}
        </h3>
      </div>

      <div className="mb-8 pl-2">
        <article className="mb-2">{description}</article>

        <p className="text-text_secondary font-light">{location}</p>

        {willDeliver && (
          <p className="text-text_secondary font-light">{`${author.username} will deliver!`}</p>
        )}
      </div>
      {canMessageSeller && (
        <SendButton
          onClick={writeMessageClickedHandler}
          value={author.username}
        />
      )}
    </div>
  );
};

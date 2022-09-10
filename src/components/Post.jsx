export const Post = ({ signedIn, post, writeMessageClickedHandler }) => {
  const { title, author, description, location, price, willDeliver, isAuthor } =
    post;
  const canMessageSeller = signedIn && !isAuthor;
  return (
    <div className="flex flex-col bg-overlay px-4 pt-8 pb-4 m-4 ">
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
        <div onClick={writeMessageClickedHandler} className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>

          <h4 className="self-end">{author.username}</h4>
        </div>
      )}
    </div>
  );
};

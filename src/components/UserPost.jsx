const UserPost = ({
  post,
  editPostClickedHandler,
  deletePostClickedHandler,
}) => {
  return (
    <div className="flex grow bg-gray-100 p-6 justify-between rounded-md">
      <div className=" grow flex flex-col ">
        <h2 className="text-gray-900 text-lg">{post.title}</h2>
        <h2 className="text-gray-900  font-bold">{post.price}</h2>
      </div>
      <div className="flex flex-col gap-4 pl-4  border-nav">
        <svg
          onClick={() => {
            editPostClickedHandler(post);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 justify-self-end"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        <svg
          onClick={() => {
            deletePostClickedHandler(post._id);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#333333"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserPost;
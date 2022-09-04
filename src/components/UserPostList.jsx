export const UserPostList = ({ posts, deletePostClickedHandler }) => {
  return (
    <div className="flex flex-col items-stretch justify-items-start">
      {posts.map((post) => {
        return (
          <div key={post._id} className="bg-overlay p-2 m-2">
            <h2>{post.title}</h2>
            <h2>{post.price}</h2>
            <button
              onClick={() => {
                deletePostClickedHandler(post._id);
              }}
            >
              DELETE
            </button>
          </div>
        );
      })}
    </div>
  );
};

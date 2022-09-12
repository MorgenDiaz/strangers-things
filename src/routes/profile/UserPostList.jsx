import UserPost from "./UserPost";

const UserPostList = ({
  posts,
  editPostClickedHandler,
  deletePostClickedHandler,
}) => {
  return (
    <div className="flex flex-col items-stretch justify-items-start gap-4 pt-2">
      {posts.map((post) => {
        return (
          <UserPost
            key={post._id}
            post={post}
            editPostClickedHandler={editPostClickedHandler}
            deletePostClickedHandler={deletePostClickedHandler}
          />
        );
      })}
    </div>
  );
};

export default UserPostList;

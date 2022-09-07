import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Navigation = ({ user, setUser }) => {
  const { pathname } = useLocation();
  return (
    <nav className="flex justify-between bg-navigation p-2">
      <Link to="/">Posts</Link>

      {user ? (
        pathname === `/profile` ? (
          <Link
            to={"/login"}
            onClick={() => {
              setUser(null);
            }}
          >
            Signout
          </Link>
        ) : (
          <Link to={"/profile"}>{user.name}</Link>
        )
      ) : (
        <Link to={"/login"}>LOGIN</Link>
      )}
    </nav>
  );
};

export default Navigation;

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navigation = ({ user, setUser }) => {
  const { pathname } = useLocation();

  return (
    <nav className="flex fixed left-0 right-0 top-0 justify-between bg-navigation h-16 p-2">
      <Link to="/" className="flex items-end font-bold text-text">
        Posts
      </Link>
      {user ? (
        pathname === `/profile` ? (
          <Link
            to={"/login"}
            className="flex items-end"
            onClick={() => {
              setUser(null);
            }}
          >
            Signout
          </Link>
        ) : (
          <Link to={"/profile"} className="flex items-end">
            {user.name}
          </Link>
        )
      ) : (
        <Link to={"/login"} className="flex items-end">
          LOGIN
        </Link>
      )}
    </nav>
  );
};

export default Navigation;

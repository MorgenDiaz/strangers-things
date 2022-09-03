import "./App.css";
import Posts from "./components/Posts";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import { UserProfile } from "./components/UserProfile";
import { useLocalStorage } from "./data/local-storage";

function App() {
  const [user, setUser] = useLocalStorage("user", null);
  return (
    <BrowserRouter>
      <div className="bg-background min-h-[100vh] flex flex-col">
        <nav className="flex justify-between bg-navigation p-2">
          <Link to="/" element={<Posts />}>
            Posts
          </Link>

          {user ? (
            <Link to={"/profile"}>{user.name}</Link>
          ) : (
            <Link to={"/login"}>LOGIN</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

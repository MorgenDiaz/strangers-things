import "./App.css";
import { Navigation, Posts, Login, UserProfile, Register } from "./routes";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useLocalStorage } from "./data/local-storage";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useLocalStorage("user", null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && (pathname === `/login` || pathname === `/register`)) {
      navigate("/profile");
    }
  });

  return (
    <div className="bg-background min-h-[100vh] flex flex-col text-text">
      <Navigation user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

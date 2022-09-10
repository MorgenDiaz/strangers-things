import "./App.css";
import {
  Navigation,
  Home,
  Posts,
  Login,
  UserProfile,
  Register,
} from "./routes";

import Loading from "./components/Loading";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./data/local-storage";
import { useEffect, useState } from "react";
import { CreatePost } from "./components/CreatePost";

function App() {
  const [user, setUser] = useLocalStorage("user", null);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (pathname === `/login` || pathname === `/register`)) {
      navigate("/profile");
    }
  });

  return (
    <div className="bg-background min-h-[100vh] flex flex-col text-text pt-16">
      <Navigation user={user} setUser={setUser} />

      {isLoading && <Loading />}

      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            index
            element={<Posts user={user} setIsLoading={setIsLoading} />}
          />
          <Route
            path="/create"
            element={<CreatePost user={user} setIsLoading={setIsLoading} />}
          />
        </Route>

        <Route
          path="/profile"
          element={<UserProfile user={user} setIsLoading={setIsLoading} />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import {
  Home,
  Posts,
  Login,
  UserProfile,
  Register,
  CreatePost,
} from "./routes";

import { useLocalStorage } from "./data/local-storage";
import { Navigation, Loading } from "./components";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage("user", null);
  const [isLoading, setIsLoading] = useState(false);

  const rerouteLoggedInUserFromLoginRegister = (user, path, navigate) => {
    if (user && (path === `/login` || path === `/register`)) {
      navigate("/profile");
    }
  };

  useEffect(() => {
    rerouteLoggedInUserFromLoginRegister(user, pathname, navigate);
  });

  return (
    <div className=" min-h-[100vh] flex flex-col pt-16 bg-gray-400 text-text ">
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

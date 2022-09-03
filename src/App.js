import "./App.css";
import Posts from "./components/Posts";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { UserProfile } from "./components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-background min-h-[100vh] flex flex-col  justify-center justify-items-center">
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

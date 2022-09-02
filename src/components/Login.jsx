import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../data/strangers-things-api";
import { useLocalStorage } from "../data/local-storage";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useLocalStorage("user", null);

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      const userToken = await login(name, password);
      console.log(userToken);
      setUser({ name, token: userToken });
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleNameChanged = (event) => {
    const enteredName = event.target.value;
    setName(enteredName);
  };

  const handlePasswordChanged = (event) => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold uppercase">Login</h2>
      <form onSubmit={handleFormSubmission} className="flex flex-col">
        <input type="text" onChange={handleNameChanged} />
        <input type="password" onChange={handlePasswordChanged} />
        <input type="submit" value="Login" />
      </form>
      <Link to={"/register"}>REGISTER</Link>
    </div>
  );
};

export default Login;

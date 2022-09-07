import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../data/api";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../data/local-storage";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useLocalStorage("user", null);

  const navigate = useNavigate();

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      const userToken = await registerUser(name, password);
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
      <h2 className="text-3xl font-bold uppercase">Register</h2>
      <form onSubmit={handleFormSubmission} className="flex flex-col">
        <input type="text" onChange={handleNameChanged} />
        <input type="password" onChange={handlePasswordChanged} />
        <input type="submit" value="Register" />
      </form>
      <Link to={"/login"}>LOGIN</Link>
    </div>
  );
};

export default Register;

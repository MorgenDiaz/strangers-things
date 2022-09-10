import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../data/api";
import { useState } from "react";

const Register = ({ setUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      const userToken = await registerUser(name, password);
      setUser({ name, token: userToken });
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
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
    <div className="flex flex-col pt-12 px-6">
      <h2 className="text-2xl uppercase pb-4">{"create an account"}</h2>

      {errorMessage && <p className="mb-2">{errorMessage}</p>}

      <form onSubmit={handleFormSubmission} className="flex flex-col gap-4">
        <input
          onChange={handleNameChanged}
          type="text"
          required
          className="p-2 text-sm"
        />

        <input
          onChange={handlePasswordChanged}
          type="password"
          required
          className="p-2 text-sm"
        />

        <input type="submit" value={"signup"} className="uppercase font-bold" />
      </form>

      <Link to="/login" className="uppercase self-center text-text_secondary">
        {"login"}
      </Link>
    </div>
  );
};

export default Register;

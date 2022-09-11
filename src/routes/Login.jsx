import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../data/api";
import TextBox from "../components/TextBox";
import PrimaryButton from "../components/PrimaryButton";
import ErrorMessage from "../components/ErrorMessage";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      const userToken = await login(name, password);
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
      <h2 className="text-2xl font-semibold self-center text-gray-900 tracking-wide uppercase pb-6">
        {"login"}
      </h2>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <form onSubmit={handleFormSubmission} className="flex flex-col gap-4">
        <TextBox
          onChange={handleNameChanged}
          placeholder="User Name"
          required={true}
        />

        <TextBox
          onChange={handlePasswordChanged}
          type="password"
          placeholder="Password"
          required={true}
        />

        <PrimaryButton value={"Login"} />
      </form>

      <Link
        to="/register"
        className="pt-2 uppercase self-center text-gray-800 "
      >
        {"create an account"}
      </Link>
    </div>
  );
};

export default Login;

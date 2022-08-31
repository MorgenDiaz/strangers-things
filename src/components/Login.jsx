import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleFormSubmission = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold uppercase">Login</h2>
      <form onSubmit={handleFormSubmission} className="flex flex-col">
        <input type="text" />
        <input type="password" />
        <input type="submit" value="Login" />
      </form>
      <Link to={"/register"}>REGISTER</Link>
    </div>
  );
};

export default Login;

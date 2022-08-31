import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleFormSubmission = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold uppercase">Register</h2>
      <form onSubmit={handleFormSubmission} className="flex flex-col">
        <input type="text" />
        <input type="password" />
        <input type="submit" value="Login" />
      </form>
      <Link to={"/login"}>LOGIN</Link>
    </div>
  );
};

export default Register;

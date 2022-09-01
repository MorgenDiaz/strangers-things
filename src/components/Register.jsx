import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../data/strangers-things-api";

const Register = () => {
  const navigate = useNavigate();

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      await registerUser("", "");
    } catch (error) {
      console.log("done stuff");
      alert(error);
    }
    //navigate("/");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold uppercase">Register</h2>
      <form onSubmit={handleFormSubmission} className="flex flex-col">
        <input type="text" />
        <input type="password" />
        <input type="submit" value="Register" />
      </form>
      <Link to={"/login"}>LOGIN</Link>
    </div>
  );
};

export default Register;

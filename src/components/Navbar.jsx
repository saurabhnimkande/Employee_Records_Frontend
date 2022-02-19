import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Navbar = () => {
  const { auth, updateAuthFalse } = useContext(AuthContext);
  console.log(auth);

  return (
    <div id="navbar">
      <div>
        <Link to="/" className="linktext">
          Home
        </Link>
      </div>
      <div>
        <Link to="/employees" className="linktext">
          Employees
        </Link>
      </div>
      <div>
        <Link to="/profile" className="linktext">
          Profile
        </Link>
      </div>
      {!auth ? (
        <>
          <div>
            <Link to="/login" className="linktext">
              Login
            </Link>
          </div>
          <div>
            <Link to="/register" className="linktext">
              SignUp
            </Link>
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => updateAuthFalse()}>Logout</button>
        </div>
      )}
    </div>
  );
};

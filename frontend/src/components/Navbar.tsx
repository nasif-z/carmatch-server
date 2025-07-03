import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { dispatchAuthChange, useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const isAuth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatchAuthChange();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      className="mb-4 flex justify-between navbar bg-base-100 shadow-sm"
    >
      <div>
        <Link to="/" className="btn btn-ghost text-xl">
          CarMatch
        </Link>
      </div>
      <div className="flex gap-7">
        {isAuth ? (
          <>
            <Link className="btn btn-neutral" to="/new-post">
              New Post
            </Link>
            <button className="btn btn-neutral" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-neutral" to="/login">
              Login
            </Link>
            <Link className="btn btn-neutral" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}

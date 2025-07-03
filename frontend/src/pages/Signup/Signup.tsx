import { useState } from "react";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await api.post("/auth/signup/", {
        username,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError("Signup failed");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-24">
          <legend className="fieldset-legend font-extrabold text-7xl">
            Signup
          </legend>

          {error && <div className="error-message">{error}</div>}

          <label className="label">Username</label>
          <input
            type="text"
            className="input mb-6"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input mb-6"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label className="label">Re-write Password</label>
          <input
            type="password"
            className="input mb-6"
            placeholder="Re-write Password"
            onChange={(e) => setRepassword(e.target.value)}
            value={repassword}
          />

          <button className="btn btn-neutral mt-4">Create Account</button>
        </fieldset>
      </form>
    </div>
  );
}

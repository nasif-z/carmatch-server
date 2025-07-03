import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { dispatchAuthChange } from "../../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/token/", {
        username,
        password,
      });

      // Store tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      dispatchAuthChange();

      // Return to home after successful login
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-24">
          <legend className="fieldset-legend font-extrabold text-7xl">
            Login
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

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
}

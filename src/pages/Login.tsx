import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonErrorMessage from "../components/CommonErrorMessage";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState<boolean>(false);
  const [errorPass, setErrorPass] = useState<boolean>(false);
  const [errorInvalid, setErrorInvalid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorInvalid("");

    if (!username.trim() && !password.trim()) {
      setErrorUser(true);
      setErrorPass(true);
      return;
    } else if (!password.trim()) {
      setErrorPass(true);
      return;
    } else if (!username.trim()) {
      setErrorUser(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        login();
        navigate("/upload-docs");
      } else {
        const data = await res.json();
        setErrorInvalid(data.detail || "Invalid username or password");
      }
    } catch {
      setErrorInvalid("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (username.length !== 0) setErrorUser(false);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (password.length !== 0) setErrorPass(false);
  };

  return (
    <div className="min-h-screen w-full bg-secondary flex flex-col items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-accent"
      >
        <h2 className="text-2xl font-poppins font-bold text-gray-700 mb-6 text-center">
          Login
        </h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-500 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUserName}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            // required
          />
          <CommonErrorMessage
            error={errorUser}
            message="Please enter a valid username"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-500 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            // required
          />
          <CommonErrorMessage
            error={errorPass}
            message="Please enter a valid Password"
          />
        </div>
        {errorInvalid && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorInvalid}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-textLight py-2 rounded-md font-poppins font-medium hover:bg-opacity-90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-3 py-2 rounded-md font-poppins font-medium text-gray-500 border border-gray-300 hover:bg-gray-50 transition-all duration-300"
        >
          ← Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default Login;

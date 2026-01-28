import React, { useState } from "react";
import CommonErrorMessage from "../components/CommonErrorMessage";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState<boolean>(false);
  const [errorPass, setErrorPass] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() && !password.trim()) {
      // Handle validation error
      console.log("here: username and password");
      setErrorUser(true);
      setErrorPass(true);
      return;
    } else if (!password.trim()) {
      console.log("here: password");
      setErrorPass(true);
      return;
    } else if (!username.trim()) {
      console.log("here: username");
      setErrorUser(true);
      return;
    }
    // Implement login logic here
    console.log("Logging in with", { username, password });
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
        <button
          type="submit"
          className="w-full bg-accent text-textLight py-2 rounded-md font-poppins font-medium hover:bg-opacity-90 transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

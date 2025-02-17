import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    fetchUserData();
  }, [error]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/profile", {
        headers: {
          authorization: localStorage.getItem("authorization"), // Add your authorization token if needed
        },
      });
      setUserData(response.data.username);
      setIsLogin(true);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      const token = `bearer ${response.data.token}`;
      localStorage.setItem("authorization", token);
      setError("");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      {isLogin ? (
        <div>
          <h1>Hello {userData}</h1>
          <button>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

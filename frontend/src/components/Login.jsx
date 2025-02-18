import React, { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./Login.css";

// Lazy load the Dashboard component
const Dashboard = React.lazy(() => import("./Dashboard"));

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    if (!isAuthenticated) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", () => {
        window.history.pushState(null, "", window.location.href);
      });
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      console.log("Attempting login with email:", email);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error response:", errorData);
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      console.log("Successful login response:", data);

      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);

      navigate("/dashboard"); // Navigate to dashboard after login
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.clear();
    setIsAuthenticated(false);
    window.location.replace("/login");
  };

  const handleRegister = () => {
    navigate("/registration");
  };

  return (
    <div>
      <NavBar />
      <div className="login-container">
        {!isAuthenticated ? (
          <>
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleLogin}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <button onClick={handleRegister} className="register-button" disabled={loading}>
              Register
            </button>
          </>
        ) : (
          <>
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
          
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <Dashboard />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../Context/Admin';
import { toast } from 'react-hot-toast';
import "./style.css";

export default function Login() {
  const { login, isLogin } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        collectData();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, password]);

  const collectData = async () => {
    setIsLoading(true);
    setButtonText("Login.....");

    try {
      let result = await fetch(`${process.env.REACT_APP_API}/admin/login`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      if (result.name) {
        localStorage.setItem("user", JSON.stringify(result));
        login();
        toast.success('Login Successfully');
        navigate("/");
      } else {
        toast.error('Invalid Details');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setButtonText("Login");
    }
  };

  return (
    <div className="Signup_Container">
      <input
        type="text"
        className="inputBox"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={collectData} className="signUpBtn" disabled={isLoading}>
        {buttonText}
      </button>
    </div>
  );
}

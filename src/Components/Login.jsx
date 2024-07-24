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
    console.log(email, password);
    let result = await fetch(`${process.env.REACT_APP_API}/admin/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      login();
      toast.success('Login Successfully');
      navigate("/");
    } else {
      toast.error('Invalid Details');
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
      <button onClick={collectData} className="signUpBtn">
        Login
      </button>
    </div>
  );
}

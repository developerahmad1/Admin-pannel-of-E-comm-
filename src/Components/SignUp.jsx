import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../Context/Admin";
import { toast } from 'react-hot-toast';

export default function SignUp() {
  const { isLogin, login } = useAdmin();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const collectData = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!name) {
      toast.error("Enter Your Name");
      setIsSubmitting(false);
      return;
    }

    if (!email) {
      toast.error("Enter Email");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter Valid Email");
      setIsSubmitting(false);
      return;
    }

    if (!password) {
      toast.error("Enter Password");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters");
      setIsSubmitting(false);
      return;
    }

    try {
      let result = await fetch(`${process.env.REACT_APP_API}/admin/register`, {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      if (result._id) {
        login();
        toast.success("Successfully Signed Up");
      } else {
        toast.error(result.result);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      collectData();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [name, email, password]);

  return (
    <div className="Signup_Container">
      <input
        type="text"
        className="inputBox"
        placeholder="User Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
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
      <button onClick={collectData} className="signUpBtn" disabled={isSubmitting}>
        Sign Up
      </button>
    </div>
  );
}

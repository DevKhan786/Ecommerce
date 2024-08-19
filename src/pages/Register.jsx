import React, { useState, useEffect } from "react";
import { auth } from "../firebase-cfg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register({ isAuth, setIsAuth }) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleRegister = async () => {
    if (!emailValue || !passwordValue) {
      alert("Please fill out both fields.");
      return;
    } else {
      try {
        await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
        console.log("User registered and logged in successfully");
        navigate("/");
        setIsAuth(true);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("This email is already in use. Please try logging in.");
        } else {
          console.error("Registration error: ", error);
          alert("Error creating account. Please try again.");
        }
      }
    }

    setEmailValue("");
    setPasswordValue("");
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-152px)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>
        <input
          type="email"
          placeholder="Enter Email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          className="mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

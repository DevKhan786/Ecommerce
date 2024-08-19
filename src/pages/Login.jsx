import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase-cfg";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login({ isAuth, setIsAuth }) {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          uid: user.uid,
        });
        console.log("New user document created in Firestore");
      }

      console.log("User logged in successfully");
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const handleLogin = async () => {
    if (!emailValue || !passwordValue) {
      alert("Please fill out both fields.");
      return;
    } else {
      try {
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        console.log("User logged in successfully");
        setIsAuth(true);
        navigate("/");
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          alert("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          alert("No account found with this email. Please register.");
        } else {
          console.error("Login error: ", error);
          alert("Error logging in. Please try again.");
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
          Login
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
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-4"
        >
          Login
        </button>
        <button
          onClick={googleLogin}
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Sign in with Google
        </button>

        <p className="p-3 text-sm mt-4 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="cursor-pointer text-purple-700 hover:text-purple-500 font-semibold transition-colors duration-300"
          >
            Register here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { auth } from "../firebase-cfg";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Profile({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleSignOut = async () => {
    signOut(auth);
    navigate("/");
    setIsAuth(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Profile
        </h2>

        <button
          onClick={handleSignOut}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

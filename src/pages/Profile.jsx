import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-cfg";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function Profile({ isAuth, setIsAuth }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        }
      };
      fetchUserData();
    }
  }, [isAuth, navigate]);

  const handleSignOut = async () => {
    signOut(auth);
    navigate("/");
    setIsAuth(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-152px)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Welcome, {userData?.displayName || userData?.email || "User"}!
        </h2>

        {userData?.photoURL && (
          <img
            src={userData.photoURL}
            alt="User Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}

        <p className="text-gray-600">
          <strong>Email:</strong> {userData?.email || "N/A"}
        </p>

        <p className="text-gray-600">
          <strong>Member Since:</strong>{" "}
          {userData?.createdAt?.toDate().toLocaleDateString() || "N/A"}
        </p>

        <button
          onClick={handleSignOut}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-6"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

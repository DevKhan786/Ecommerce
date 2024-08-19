import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-152px)]">
      <section className="bg-blue-500 text-white min-h-[calc(100vh-144px)] flex flex-col justify-center items-center text-center">
        <div className="mx-auto flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Hamazon!</h1>
          <p className="text-xl mb-8">
            Your one-stop shop for all your favorite products.
          </p>
          <Link
            to="/product"
            className="bg-orange-500 text-white px-6 py-4 rounded-lg  hover:bg-orange-600 transition duration-300 ease-in-out animate-pulse-scale text-xl font-bold"
          >
            Shop Sale
          </Link>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2024 Hamazon. All rights reserved.</p>
      </footer>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="bg-blue-500 text-white min-h-[calc(100vh-60px)] flex flex-col justify-center items-center text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Welcome to Hamazon!</h1>
          <p className="text-xl mb-8">
            Your one-stop shop for all your favorite products.
          </p>
          <Link
            to="/product"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-orange-600 transition duration-300 ease-in-out"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Exclusive Offers</h2>
          <div className="flex flex-wrap justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md mx-4 mb-4 w-full sm:w-1/2 lg:w-1/3">
              <h3 className="text-2xl font-semibold mb-2">Summer Sale</h3>
              <p className="text-gray-700 mb-4">
                Get up to 50% off on selected items!
              </p>
              <Link
                to="/product"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition duration-300 ease-in-out"
              >
                Shop Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2024 Hamazon. All rights reserved.</p>
      </footer>
    </div>
  );
}

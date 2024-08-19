import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  isAuth,
  setIsAuth,
  searchValue,
  setSearchValue,
}) {
  const navigate = useNavigate();
  const { cartItems } = useContext(ShopContext);

  const handleClick = () => {
    if (!searchValue.trim()) return;
    navigate("/search");
  };

  const totalItems = Object.values(cartItems).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="w-full flex justify-between items-center px-4">
        <div className="text-white font-semibold text-xl">
          <Link
            to="/"
            className="text-white hover:text-orange-500 duration-200 ease-in-out"
          >
            Hamazon
          </Link>
        </div>
        <div className="flex flex-grow px-8">
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full p-2 pl-4 rounded-l-lg border-none bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="p-2 bg-orange-500 text-white rounded-r-lg border-none hover:bg-orange-600 transition duration-300 ease-in-out"
          >
            Search
          </button>
        </div>
        <div className="flex space-x-14">
          {!isAuth ? (
            <Link
              to="/login"
              className="text-white hover:text-orange-500 duration-200 ease-in-out"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/profile"
              className="text-white hover:text-orange-500 duration-200 ease-in-out"
            >
              Profile
            </Link>
          )}
          <Link
            to="/product"
            className="text-white hover:text-orange-500 duration-200 ease-in-out"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="text-white hover:text-orange-500 duration-200 ease-in-out"
          >
            Cart
            <span className="ml-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

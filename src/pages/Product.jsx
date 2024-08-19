import React, { useContext } from "react";
import { ProductList } from "../components/ProductList";
import { ShopContext } from "../context/Shopcontext";

export default function Product() {
  const { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(ShopContext);
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Explore Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-12">
          {ProductList.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-2xl hover:shadow-black transition-shadow duration-300 ease-in-out flex flex-col"
            >
              <div className="flex-grow justify-center items-center flex flex-col">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-32 h-32 object-cover mb-4 rounded-lg border border-gray-200 shadow-md"
                />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.productName}
                </h4>
                <p className="text-xl font-bold text-gray-700 mb-4">
                  ${product.price}
                </p>
              </div>
              <div className="flex justify-evenly items-center">
                <button
                  className="bg-black shadow-lg text-white px-4 py-2 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-125 hover:shadow-xl mt-auto"
                  onClick={() => removeFromCart(product.id)}
                >
                  -
                </button>
                <span className="text-xl font-semibold text-gray-800">
                  {cartItems[product.id] || 0}
                </span>
                <button
                  className="bg-black shadow-lg text-white px-4 py-2 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-125 hover:shadow-xl mt-auto"
                  onClick={() => addToCart(product.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

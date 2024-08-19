import React, { useContext, useState } from "react";
import { ProductList } from "../components/ProductList";
import { ShopContext } from "../context/Shopcontext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Cart({ isAuth, setIsAuth }) {
  const navigate = useNavigate();
  const [loggedMessage, setLoggedMessage] = useState("");

  const onCheckout = () => {
    if (isAuth) {
      navigate("/checkout");
    } else {
      setLoggedMessage("YOU ARE NOT LOGGED IN");
    }
  };

  const { cartItems, clearCart } = useContext(ShopContext);

  const totalItems = Object.values(cartItems).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const totalCost = ProductList.reduce((total, product) => {
    return total + cartItems[product.id] * product.price;
  }, 0);

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-152px)] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Shopping Cart
        </h1>

        {totalItems === 0 ? (
          <div className="flex justify-center items-center min-h-[calc(100vh-400px)] flex-col">
            <div className="bg-white p-8 max-w-lg w-full text-center rounded-3xl shadow-xl border-2 border-dashed border-gray-300">
              <p className="text-2xl font-semibold text-gray-800">
                Your Hamazon cart is empty!
              </p>
              <p className="text-lg text-gray-500 mt-2">
                Add some products to your cart and they will appear here.
              </p>
            </div>
            <Link
              to="/product"
              className="mt-10 animate-pulse-scale bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300 ease-in-out font-bold"
              onClick={onCheckout}
            >
              Return to Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {ProductList.map((product) => {
                if (cartItems[product.id] > 0) {
                  return (
                    <div
                      key={product.id}
                      className="bg-white p-6 rounded-lg shadow-2xl hover:shadow-black transition-shadow duration-300 ease-in-out flex flex-col justify-center items-center"
                    >
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
                      <div className="w-full flex justify-between items-center">
                        <p className="text-lg font-semibold text-gray-800">
                          Quantity: {cartItems[product.id]}
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          Total: ${cartItems[product.id] * product.price}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <div className="text-center text-2xl font-bold text-gray-900 mt-8">
              Total Cost: ${totalCost.toFixed(2)}
            </div>

            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="animate-pulse-scale bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300 ease-in-out font-bold"
                onClick={onCheckout}
              >
                Checkout
              </button>
            </div>
            {loggedMessage && (
              <div className="text-center text-red-600 text-lg mt-4 font-bold">
                {loggedMessage}.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

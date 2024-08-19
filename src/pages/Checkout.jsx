import React from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="flex min-h-[calc(100vh-152px)] justify-center items-center flex-col">
      <Link
        to="/cart"
        className="px-4 py-2 bg-red-500 rounded-lg mt-10 flex items-center justify-center font-bold hover:bg-red-600 animate-pulse-scale"
      >
        (Return to Cart)
      </Link>
    </div>
  );
}

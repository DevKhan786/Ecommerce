import React, { useEffect, useState } from "react";
import { ProductList } from "../components/ProductList";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Search({ searchValue }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  const handleLinkClick = () => {
    setSearchValue("");
  };

  useEffect(() => {
    if (!searchValue) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      const filtered = ProductList.filter((product) =>
        product.productName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(ProductList);
    }
  }, [searchValue]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for: "{searchValue}"
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-xl flex flex-col items-center hover:shadow-2xl hover:shadow-black "
            >
              <Link to="/product" onClick={handleLinkClick}>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-48 h-48 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">{product.productName}</h2>
                <p className="text-gray-700">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for "{searchValue}".</p>
      )}
    </div>
  );
}

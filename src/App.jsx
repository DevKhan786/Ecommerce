import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import { auth, provider } from "./firebase-cfg";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";
import { ShopContextProvider } from "./context/Shopcontext";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ShopContextProvider>
      <Router>
        <Navbar
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Routes>
          <Route
            path="/"
            element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/search"
            element={
              <Search
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
              />
            }
          />
          <Route
            path="/login"
            element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/product"
            element={<Product isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/cart"
            element={<Cart isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/register"
            element={<Register isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/profile"
            element={<Profile isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/checkout"
            element={<Checkout isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
}

export default App;

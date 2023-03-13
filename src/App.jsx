import React from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import { BookmarksProvider } from "./context/BookmarksContext";
import { CartContextProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="App bg-slate-50 h-max">
      <BrowserRouter>
        <CartContextProvider>
          <AuthProvider>
            <BookmarksProvider>
              <NavBar />
              <AppRouter />
              <Footer />
            </BookmarksProvider>
          </AuthProvider>
        </CartContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

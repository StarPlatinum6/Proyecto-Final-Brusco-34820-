import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";

function App() {
  // const [show, setShow] = useState(true);

  // <button onClick={() => setShow(!show)}>Show/Hide</button>
  // { show ? <ItemListContainer/> : null }

  return (
    <div className="App bg-slate-50 h-max">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="LISTA DE PRODUCTOS" />}
          />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/product/:productId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

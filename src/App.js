import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const [show, setShow] = useState(true);

  // <button onClick={() => setShow(!show)}>Show/Hide</button>
  // { show ? <ItemListContainer/> : null }

  return (
    <div className="App bg-slate-400 h-max">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="LISTA DE PRODUCTOS" />}
          />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/product/:productId" element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

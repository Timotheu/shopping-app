import './styles/App.css';
import "./styles/index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Shop  from "./components/Shop";
import ProductDetail from "./components/ProductDetail";
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <ShoppingCartProvider>
      <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route index element={<Shop/>}></Route>
            <Route path="/product/:id" element={<ProductDetail/>} />
          </Routes>
        </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ProductDetails } from "../models/types";

import { getProducts } from "../services/productsAPI";
import '../styles/shop.css';
import ShopItem from "./ShopItem";

const Shop: React.FC = () => {

  const [data, setData] = useState<ProductDetails[]>([]);

  useEffect(() => {
    getProducts().then(result => {
      setData(result);
    });    
  }, []);

  useEffect(() => {
  }, [data])

  return (
    <div className="Shop">
      <header className="Shop-header">
        <h1 className="text-3xl text-gray-700 font-bold mb-5">
          Our Products        
        </h1>
        <div className="grid-container">
          {data.map(function(element: ProductDetails, index){
            return (
              <ShopItem key={index} {...element}></ShopItem>
            )
          })}
       </div>
      </header>
    </div>
  );
}

export default Shop;
import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext"
import { ProductDetails } from "../models/types";
import { getProducts } from "../services/productsAPI";
import { formatCurrency } from "../utilities/formatPrice";

type CartItemProps = {
  id: number,
  quantity: number
}

const CartItem: React.FC<CartItemProps> = ({id, quantity}) => {

  const { 
    removeFromCart, 
    decreaseCartQuantity,
    increaseCartQuantity, 
  } = useShoppingCart();

  const [products, setProducts] = useState<ProductDetails[]>([]);
  const item = products.find(i => i.id === id);

  useEffect(() => {
    getProducts().then(result => {
      setProducts(result);
    });    
  }, []);

  if (item === null) return null;

  return (
    <div className="flex flex-row m-4 w-full">
      <div className="bg-white p-8 shadow-lg canvas-product-left">
        <img src={item?.image} alt="Product" style={{
          width: "80px", objectFit: "cover"
        }}>
        </img>
      </div>
      <div className="canvas-product-right">
        <div className="m-auto text-center p-2 canvas-info">
          <span className="m-auto text-gray-700">{formatCurrency(item?.price)}</span><br></br>
          <span className="m-auto text-gray-700 font-bold">{item?.title}</span><br></br>
          <span className="m-auto text-2xl text-gray-700 font-bold">{item?.price && formatCurrency(item.price * quantity)}</span>
        </div>
        <div className="flex align-items-center flex-row w-12/12">
          <div className="flex items-center justify-center w-12/12 m-auto">
              <button onClick={() => decreaseCartQuantity(id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded mx-5">-</button>
            <div className="flex w-6/12 m-auto">
              <span className="quantity text-3xl"> {quantity}</span> 
            </div>
            <button onClick={() => increaseCartQuantity(id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded mx-5">+</button>
          </div>
          <button onClick={() => removeFromCart(id)} className="bg-red-300 hover:bg-blue-300 text-white font-bold rounded m-auto remove-button remove-all-button"> Remove All </button>
        </div>
      </div>
      
    </div>
  )
}

export default CartItem;

import React, { useEffect, useState } from "react";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import { useShoppingCart } from "../context/ShoppingCartContext"
import '../styles/shop.css';
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatPrice";
import { getProducts } from "../services/productsAPI";
import { ProductDetails } from "../models/types";
 
type ShoppingCartProps = {
  isOpen: boolean;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({isOpen}) => {

  const { closeCart, cartItems } = useShoppingCart()
  const [products, setProducts] = useState<ProductDetails[]>([]);

  function calculateTotal () {
    var total =formatCurrency(cartItems.reduce((total, cartItem) => {
      const item = products.find(i => i.id === cartItem?.id);
      if (cartItem?.quantity === 0) {
        return 0;
      }
      return total + (item?.price || 0) * (cartItem?.quantity || 0);
  }, 0));

    if (total === 'NaN') {
      return "No items in cart. Please select a product.";
    }
    else {return total;}
  }

  useEffect(() => {
    getProducts().then(result => {
      setProducts(result);
    });    
  }, []);

    return (
      <OffCanvas className="off-canvas"
        width={800}
        transitionDuration={300}
        effect={"parallax"}
        isMenuOpened={isOpen}
        position={"right"}
      >
        <OffCanvasMenu className="canvas-cart shadow-lg">
          <p className="text-3xl text-gray-700 font-bold mb-5">Your shopping cart</p>
          <div className="flex flex-col">
            {cartItems.map(item => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <div className="mt-5 text-end mr-5">
            <p className="text-2xl text-gray-700 font-bold">Total:</p>
            <p className="text-3xl text-gray-700 font-bold mb-5">
              { calculateTotal()
              
              
              }
            </p>
          </div>
          <div>
            <button className="add-to-cart-button bg-blue-300 hover:bg-blue-300 text-white font-bold rounded remove-button p-4" onClick={closeCart}> CLOSE CART </button>
          </div>
        </OffCanvasMenu>
      </OffCanvas>
      );
}

export default ShoppingCart;
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { ProductDetails } from '../models/types';
import '../styles/shop.css';
import { formatCurrency } from '../utilities/formatPrice';

const ShopItem: React.FC<ProductDetails> = ({id, title, image, price}) => {

  const formattedPrice = formatCurrency(price);
  const navigate = useNavigate();

  function showMore (id: number) {
    navigate(`/product/${id}`);
  }

  const {
    getItemQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart
  } = useShoppingCart()

  const quantity = getItemQuantity(id);

  const quantityButton: ReactNode = (quantity === 0 ? 
    ( <button className="add-to-cart-button bg-red-300 hover:bg-blue-300 text-white font-bold rounded mt-2 remove-button" onClick={() => increaseCartQuantity(id)}> + Add to cart </button>
    ) : 
    (
    <div className="flex align-items-center flex-col mb-3">
      <div className="flex items-center justify-center w-10/12 m-auto mb-2">
          <button onClick={() => decreaseCartQuantity(id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded mx-5">-</button>
        <div className="flex m-auto">
          <span className="quantity text-3xl"> {quantity}</span> 
        </div>
        <button onClick={() => increaseCartQuantity(id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded mx-5">+</button>
      </div>
      <button onClick={() => removeFromCart(id)} className="bg-red-300 hover:bg-blue-300 text-white font-bold rounded remove-button-1"> Remove </button>
    </div>
  )
  )

  return (
    <div className="grid-item shadow-lg" key={id}>
              <div className="product-upper">
                <h2 className="text-center text-2xl text-gray-700 font-bold">{title}</h2>
              </div>
              <div className="product-center">
                <img src={image} className="product-image" alt="Product"></img>
              </div>
              <div className="product-lower mt-auto">
                <p className="font-bold mb-5">Price: {formattedPrice}</p>
                <div className="mt-auto flex flex-col">
                  {quantityButton}
                  <button className="add-to-cart-button bg-red-300 hover:bg-blue-300 text-white font-bold rounded remove-button" onClick={() => showMore(id)}>show more </button>
                </div>
              </div>
            </div>
  )
}

export default ShopItem;
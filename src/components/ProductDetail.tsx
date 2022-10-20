import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { ProductDetails } from "../models/types";
import { getProductById } from "../services/productsAPI";
import '../styles/productDetail.css';
import { formatCurrency } from "../utilities/formatPrice";


const ProductDetail: React.FC = () => {

  const [product, setProduct] = useState<ProductDetails>();

  const { id } = useParams();
  
  useEffect(() => {
    getProductById(id).then(function(result) {
      result && setProduct(result);
    });    
  }, [id]);

return (
  <div className="flex flex-row">
    <div className="m-12 w-3/6 divide-y divide-slate-100">
      <div className="bg-white shadow-md p-16">
        <img src={product?.image} alt="Product" className="details-image m-auto"></img>
      </div>
    </div>
    <div className="m-12 w-3/6">
      <h2 className="text-3xl text-gray-700 font-bold mb-5"> {product?.title}</h2>
      <p className="text-1xl text-gray-700 mb-5">{product?.description}</p>
      <h2 className="text-3xl text-gray-700 font-bold mb-5"> {formatCurrency(product?.price)}</h2>
    </div>
  </div>
)
}

export default ProductDetail;
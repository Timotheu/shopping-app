import { ProductDetails } from "../models/types";


export async function fetchProducts() {

  try{
      const response = await fetch('https://fakestoreapi.com/products');
      var data: ProductDetails[] = await response.json();
      return (data);
  } 
  catch(error) {
    throw ("No Data found");
  } 
};

export async function fetchProductById (id) {
  try{
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    var data: ProductDetails = await response.json();
    return (data);
  } 
  catch(error) {
    throw ("No Data found");
  } 
};

export async function getProducts () {

  const products = await fetchProducts();
  return products;
};

export async function getProductById (id) {
  const product = await fetchProductById (id);
  return product;
};






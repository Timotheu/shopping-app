export type ProductsResponseBody = {
  details: ProductDetails[]
}

export type ProductDetails = {
  id: number,
  title: string,
  image: string,
  description: string,
  price: number,
  category: string,
  rating: ProductRating
};

export type ProductRating = {
  count: number, 
  rate: number
}
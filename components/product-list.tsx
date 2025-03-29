"use client"
import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {

  const [searchTerm,setSearchTerm] = useState<string>("")

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase()
    const nameMatch = product.name.toLowerCase().includes(term)
    console.log("nameMatch",nameMatch)
    const descriptionMatch = product.description ? product.description.toLowerCase().includes(term):false

    return nameMatch || descriptionMatch
  })
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
        value={searchTerm}
        onChange={(e)=>{setSearchTerm(e.target.value)}}
        type="text"
        placeholder="Search Products...."
        className="w-full max-w-md border rounded border-gray-300 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
      </div>

      <ul className="mt-6 grid grid-col-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProduct.map((product,key) => {
          return <li key={key}><ProductCard product={product}/></li>;
        })}
      </ul>
    </div>
  );
};

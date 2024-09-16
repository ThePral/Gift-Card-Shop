import React from "react";
import ProductLi from "../components/product_li";

export default function ProductsList() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      description: "This is product 1",
      image: "flight1.png"
    },
    {
      id: 2, 
      name: "Product 2",
      price: 200,
      description: "This is product 2",
      image: "flight2.png"
    },
    {
      id: 3,
      name: "Product 3", 
      price: 300,
      description: "This is product 3",
      image: "flight3.png"
    } ,
    {
      id: 4,
      name: "Product 3", 
      price: 300,
      description: "This is product 3",
      image: "flight4.png"
    } 
  ];

  return (
    <div className="container">
      <h1>Products</h1>

      <ul className="products-list">
        {products.map(product => (
          <ProductLi 
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </div>
  );
}

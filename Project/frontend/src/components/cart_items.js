import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';

const CartItem = ({ key, item, onIncrease, onDecrease, onDelete }) => {

  const {product, setProduct} = useState({
    id: 0,
    name: "",
    price: 0,
    description: "",
  });
  const url = "http://" + (process.env.BACKEND_HOST || 'localhost') + "/api/products/" + item.product + "/";
  useEffect(() => {
    axios.get(url)
      .then(res => {
        console.log(item);
        console.log(res.data);
        setProduct(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="cart-item">
      <img src={product.name} alt={product.name} />

      <div>
        <h4>{product.name}</h4>
        <p>${product.price}</p>
        <p>Number: {item.quantity}</p>
        <button onClick={() => onIncrease(key)}>Increase</button>
        <button onClick={() => onDecrease(key)}>Decrease</button>
        <button onClick={() => onDelete(key)}>Delete</button>
      </div>
    </div>
  );
};

export default CartItem;

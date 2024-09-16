import React, { useState } from 'react';
import '../styles/pages_general.css';
const ShoppingCart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10.99 },
    { id: 2, name: 'Item 2', price: 19.99 },
    { id: 3, name: 'Item 3', price: 14.99 },
    // Add more items as needed
  ]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;

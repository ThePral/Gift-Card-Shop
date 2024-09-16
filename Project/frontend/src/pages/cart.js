import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CartItem from '../components/cart_items';

const CartPage = () => {

  const getUrl = "http://" + (process.env.BACKEND_HOST || 'localhost') + "/api/get_cart/";
  const updateUrl = "http://" + (process.env.BACKEND_HOST || 'localhost') + "/api/update_order/";
  const bodyParameters = {};
  const config = {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
  };

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    axios.get(getUrl, config)
      .then(res => {
        console.log(res.data);
        setCartItems(res.data.map(item => (
          <CartItem 
            key={item.id}
            item={item}
            onIncrease={handleUpdate('increment')}
            onDecrease={handleUpdate('decrement')}
            onDelete={handleUpdate('delete')}
          />
        )));
      })
      .catch(err => {
        console.log(err);
      });
    setLoading(false);
  }

  const handleUpdate = async (change) => {
    return async (itemId) => {
      const item = cartItems.find(item => item.id === itemId);
      if (change === 'increment') {
        item.quantity += 1;
      } else if (change === 'decrement') {
        item.quantity -= 1;
      } else if (change === 'delete') {
        item.quantity = 0;
      }
      axios.put(
        updateUrl,
        {
          item: itemId,
          quantity: item.quantity
        },
        config
      )
      .then(res => {
        console.log(res.data);
        const updated = cartItems.map(item => {
          if (item.id === itemId) {
            return item;
          }
          return item;
        });
        setCartItems(updated.map(item => (
          <CartItem 
            key={item.id}
            item={item}
            onIncrease={handleUpdate('increment')}
            onDecrease={handleUpdate('decrement')}
            onDelete={handleUpdate('delete')}
          />
        )));
      })
      .catch(err => {
        console.log(err);
      });
    }
  }


  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems}
    </div>
  );
}

export default CartPage;
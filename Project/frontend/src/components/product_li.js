import React from "react";
import "../styles/products.css";
import axios from "axios";

export default function ProductLi(props) {
    const product = props.product;
    const url = "http://" + (process.env.BACKEND_HOST || 'localhost') + "/api/create_order/";
    const data = {
        product: product.id,
        quantity: 1
    };


    const purchase = () => {
        if (localStorage.getItem('token') === null) {
            alert('You must be logged in to purchase items');
            return;
        }
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        };
        console.log(url);
        console.log(data);
        axios.post(url, data, config)
            .then(res => {
                console.log(res.data);
                alert('Item added to cart');
            })
            .catch(err => {
                console.log(err);
                alert('There was an error purchasing this item. Please try again later.');
            });
    };

    return (

        <div className="product-li">
            <div className="product-li-left">
                <img className="product-li-icon" src={product.image} alt="Product" />
                <div className="product-li-name">{product.name}</div>
            </div>
            <div className="product-li-info">{product.description}</div>
            <div className="product-li-price">${product.price}</div>
            <button className="product-li-button" onClick={purchase}>Add to cart</button>
        </div>
    );

}



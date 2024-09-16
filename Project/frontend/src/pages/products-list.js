import React, { useEffect, useState } from "react";
import ProductLi from "../components/product_li";
import axios from "axios";
import {products as dummy_products} from "../constants/dummy";
import { useLocation } from "react-router-dom";

export default function ProductsList(probs) {
  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();  

  const baseUrl = "http://" + (process.env.BACKEND_HOST || 'localhost') + "/api/products/";
  const [products, setProducts] = useState(dummy_products);
  
  let params = {};
  if (query.get('category') !== null){
    params['category'] = query.get('category');
  } else if (query.get('search') !== null){
    params['search'] = query.get('search');
  }
  
  useEffect(() => {
    console.log(baseUrl);
    console.log(params);
    axios.get(baseUrl, {
      params: params
    })
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
  }, []);

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

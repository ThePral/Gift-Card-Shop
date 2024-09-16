const products = [
  {
    id: 1,
    name: "Product 1",
    price: 500,
    description: "AirlineGift offers travel brands such as Air France, KLM, Southwest Airlines",
    image: "flight1.png"
  },
  {
    id: 2, 
    name: "Product 2",
    price: 229,
    description: "AirlineGift offers travel brands such as British Airways, Qantas",
    image: "flight2.png"
  },
  {
    id: 3,
    name: "Product 3", 
    price: 5000,
    description: "AirlineGift offers travel brands such as Delta Airlines, American Airlines, United Airlines",
    image: "flight3.png"
  } ,
  {
    id: 4,
    name: "Product 3", 
    price: 500,
    description: "﻿Purchase and use of gift cards available in North America only.",
    image: "flight4.png"
  } 
];

const categories = [
  { 
    id: 1,
    name: "Flights",
    description: "Flight tickets & travel packages",
    image: "/flightcart.png"
  },
  {
    id: 2,
    name: "Games", 
    description: "fun and games",
    image: "game.png"  
  },
  {
    id: 3,
    name: "Food",
    description: "cafe's and restaurants",
    image: "foods.png"
  },  
  {
    id: 4,
    name: "services",
    description: "Internet and proxy services",
    image: "internet.png"
  } 
]

module.exports = {
  products,
  categories
};

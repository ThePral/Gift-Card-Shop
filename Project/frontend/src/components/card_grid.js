import React, { useEffect, useState } from "react";
import Card from "./card.js";
import "../styles/card_grid.css";
import {categories as dummy_categories} from "../constants/dummy";
import axios from "axios";


function CardGrid() {
  const baseUrl = "http://" + (process.env.BACKEND_HOST || 'localhost') + "/api/categories/";
  const [cards, setCards] = useState(dummy_categories.map((card) => (
    <Card 
      pk={card.id}
      name={card.name}
      description={card.description}
      image={card.image}
    />
  )));

  useEffect(() => {
    console.log(baseUrl);
    axios.get(baseUrl)
      .then(res => {
        console.log(res.data);
        setCards(res.data.map((card) => (
          <Card 
            pk={card.id}
            name={card.name}
            description={card.description}
            image={card.image}
          />
        )));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

    return (
        <div className="card-grid">
            {cards}
        </div>
    );
    }

export default CardGrid;
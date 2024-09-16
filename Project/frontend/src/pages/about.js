// About.js

import React from 'react';

import '../styles/about.css';

function About() {

  return (
    <section className="about">
      <div className="about-content">
        <h1>About Us</h1>

        <p>
        Welcome to our online store! At GSHOP, we are dedicated to
        delivering an exceptional shopping experience. 

       </p>
        <p>  
        As part of our commitment to making your
        shopping experience even more special, we offer customizable gift cards.
        </p>
        <p>  
        These gift cards can be purchased directly or used to enjoy a variety of
        special services.
        </p>
        <p>  
        Whether you're celebrating a birthday, anniversary, or
        any special occasion, our gift cards and services make for thoughtful
        and unique presents. Share the joy of GSHOP with your loved
        ones, and let them discover the perfect items that reflect their
        personal style.
        </p>

        <div className="images">

<div className="image">
  <img src="https://static.generated.photos/vue-static/face-generator/landing/wall/20.jpg" />
  <p>Our Storefront</p>  
</div>

<div className="image">    
  <img src="https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-03.jpg" />
  <p>Our CEO</p>
</div>

</div>
        
      </div>
    </section>
  );
}

export default About;

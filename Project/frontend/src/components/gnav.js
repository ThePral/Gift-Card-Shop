// create a nav with logo, search bar, and links to other pages
// this is the main navigation bar that is displayed on every page

import React, { useState } from 'react';
import '../styles/gnav.css';
import IconButton from '../components/icon_button';


function Gnav() {

    const [search, setSearch] = useState('');

    const handle_change = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="gnav">
            <div className="gnav-logo" onclick={() => { window.location.href = '/' }}>
                <img src="logo.png" alt="logo" />
            </div>
            <form className="gnav-search">
                <input name='search' type="text" placeholder="Search" onChange={handle_change}/>
                <IconButton icon="search.png" alt="search" onClick={() => {
                    window.location.href = '/products?search=' + search;
                }} />
            </form>
            <div className="gnav-links">
                <a href="/"> Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/cart">Cart</a>
                <a href="/products">Products</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        </div>
    );
}

export default Gnav;


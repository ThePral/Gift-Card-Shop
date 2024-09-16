import React from "react";
import "../styles/gfooter.css";

export default function Gfooter() {
    return (
        <div className="gfooter">
            <div className="gfooter-social">
                <a href="https://reddit.com">
                    <img src="Reddit.svg" alt="reddit" />
                </a>
                <a href="https://telegram.com">
                    <img src="Telegram.svg" alt="telegram" />
                </a>
                <a href="https://instagram.com">
                    <img src="Instagram.svg" alt="instagram" />
                </a>
            </div>
            <div>
                <p>© 2024 Gshop</p>
            </div> 
        </div>
    );
    }
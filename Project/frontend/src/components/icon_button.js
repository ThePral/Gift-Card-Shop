import React from "react";
import '../styles/icon_button.css';
import '../styles/card.css';

function IconButton(props) {
    return (
        <div className={'icon-button ' + props.className} onClick={props.onClick}>
            <img src={props.icon} alt={props.alt}/>
        </div>
    );
}

export default IconButton;
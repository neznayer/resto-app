import React from "react";
import "./menu-list-item.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPizzaSlice,
    faSeedling,
    faDrumstickBite,
} from "@fortawesome/free-solid-svg-icons";

const iconSelector = (category) => {
    switch (category) {
        case "meat":
            return <FontAwesomeIcon icon={faDrumstickBite} />;
        case "salads":
            return <FontAwesomeIcon icon={faSeedling} />;
        case "pizza":
            return <FontAwesomeIcon icon={faPizzaSlice} />;
        default:
            return category;
    }
};

const MenuListItem = ({ menuItem, onAddToCart }) => {
    const { title, price, url, category } = menuItem;
    return (
        <li className="menu__item">
            <Link to={`/${menuItem.id}`}>
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt={title}></img>
                <div className="menu__category">
                    Category: 
                    <span>
                        {iconSelector(category)}
                        {category}
                    </span>
                </div>
                <div className="menu__price">
                    Price: <span>{price}$</span>
                </div>
                </Link>
                <button onClick={(e)=> {
                    e.preventDefault();
                    onAddToCart();
                    
                    }} className="menu__btn">Add to cart</button>
            
        </li>
    );
};

export default MenuListItem;

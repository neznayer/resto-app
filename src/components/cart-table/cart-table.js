import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart} from '../../actions';

const CartTable = ({items,deleteFromCart}) => {
    

    const count = {};
    let flags = [],  unique_list = [], l = items.length, i;
    for (i=0; i<l; i++) {
        count[items[i].id] = (count[items[i].id]||0) + 1;
        if (flags[items[i].id]) {
            continue
        };
        flags[items[i].id] = true;
        unique_list.push(items[i])
    };
    
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    unique_list.map(item => {
                        

                        const { title, price, url, id} = item;


                        return (
                            <div key = {id} className="cart__item">
                            <img src={url} className="cart__item-img" alt={title}></img>
                            <div className="cart__item-title">{title}</div>
                        <div className="cart__item-price">{price}$ x {count[id]}</div>
                            <div className="cart__close" onClick={() => deleteFromCart(id)}>&times;</div>
                        </div>
                        )
                    })
                }

            </div>
        </>
        );
}


const mapStateToProps = ({items}) => { 
    
    return { 
        items
    }
};

const mapDispatchToProps = {
    
        deleteFromCart
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
import React, { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css'; 

const ItemDetail = ({ id, name, src, precio, stock, description, onAdd }) => {
    const [quantity, setQuantity] = useState(0);

    const handleAdd = (quantity) => {
        setQuantity(quantity);
        if (onAdd) {
            onAdd(id, quantity); 
        }
    };

    return (
        <div className="item-detail">
            <h1 className="item-title">{name}</h1>
            <picture>
                <img src={src} alt={name} className="item-image" />
            </picture>
            <div className="item-info">
                <p className="item-price">Precio: ${precio}</p>
                <p className="item-stock">Stock disponible: {stock}</p>
                <p className="item-description">{description}</p>
                <ItemCount
                    stock={stock}
                    initial={quantity}
                    onAdd={handleAdd}
                />
            </div>
        </div>
    );
};

export default ItemDetail;


import React, { useContext } from 'react'
import {CartItemCount} from '../cartItemCount/cartItemCount'

import deleteImg from '../../recursos/deleteItem.png'
import './cartItem.css'

function CartItem({item, quantity}) {

    console.log(item, quantity)

    const addItem = () => { }
    const removeItem = () => { }

    const onAmountChange = (quantity) => {
        addItem(item, quantity)
    }

    return (
        
        <div className='cartItemContainer'>
            <img className='cartItemImage' src={item.imgUrl} />
            <h2 className='itemTitle'>{item.nombre}</h2>
            <CartItemCount initial={quantity} stock={item.stock} onAmountChange={onAmountChange} />
            <h2 className='itemPrice'>${item.precio*quantity}</h2>
            <img src={deleteImg} height='30px' width='30px' onClick={() => removeItem(item.id)} alt='delete button'/>
        </div>
        
    )


}

export { CartItem }
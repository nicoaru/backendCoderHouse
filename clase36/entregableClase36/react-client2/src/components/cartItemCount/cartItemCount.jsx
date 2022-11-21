import React, { useState } from 'react'
import './cartItemCount.css'



function CartItemCount({ initial, stock, onAmountChange }) {
    const [itemAmount, setItemAmount] = useState(stock === 0 ? 'Sin stock' : initial)
    const restarItem = () => {
        if (stock !== 0 && itemAmount > 1) {
            let newAmount = itemAmount-1
            setItemAmount(newAmount)
            onAmountChange(-1)
        }
    } 
    const sumarItem = () => {
        if (stock !== 0 && itemAmount < stock) {
            let newAmount = itemAmount+1
            setItemAmount(newAmount)
            onAmountChange(1)
        }
    }

    return (
        <div className='cartItemCount'>
            <div className='restarItem' onClick={restarItem}>-</div>
            <div className='amount'>{itemAmount}</div>
            <div className='sumarItem' onClick={sumarItem}>+</div>
        </div>
    )
}

export { CartItemCount }
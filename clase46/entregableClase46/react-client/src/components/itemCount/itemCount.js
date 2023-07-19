import React, { useState } from 'react'
import './itemCount.css'

function ItemCount({ initial, stock, onAdd }) {
    // console.log(`stock => ${stock}`)
    


    let outOfStock = stock == 0 ? true : false;
    const [itemAmount, setItemAmount] = useState(outOfStock ? 'Sin stock' : initial)
    



    const restarItem = () => {
        (stock !== 0 && itemAmount > 1) && setItemAmount(itemAmount-1)
    } 
    const sumarItem = () => {
        (stock !== 0 && itemAmount < stock) && setItemAmount(itemAmount+1)
    }

    return (
        <div className='itemCountContainer'>
            <div className='itemCount'>
                <div className='restarItem' onClick={restarItem}>-</div>
                <div className='amount'>{itemAmount}</div>
                <div className='sumarItem' onClick={sumarItem}>+</div>
            </div>
            <button className='btn' onClick={() => onAdd(itemAmount)} disabled={outOfStock}>Agregar al carrito</button>
        </div>
    )

}

export { ItemCount }
import React from 'react'
import { Link } from 'react-router-dom'
import './item.css'

function Item({item}) {

    return(

        <div id={item._id} className='item-card'>
            <Link className='link' to={`/item/${item._id}`}>
                <div className='imgContainer'>
                    <img src={item.imgUrl} width='100%' alt='imagen del producto'/>
                </div>            
                <h1 className='title'>{item.nombre}</h1>
                <h2 className='price'>$ {item.precio}</h2>
                <p className='description'>{item.descripcion}</p>
                <Link className='link' to={`/category/${item.categoria}`}><p className='category'>· {item.categoria} ·</p></Link>            
            </Link>

        </div>

    )
}

export { Item }
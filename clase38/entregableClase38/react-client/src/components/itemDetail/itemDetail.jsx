//
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import './itemDetail.css'
import loadingGif from '../../recursos/spinner.svg'
import { ItemCount } from '../itemCount/itemCount' 
import { Context } from '../../context/context'


function ItemDetail({item, loading, error}) {

    const {sessionUser, setSessionUser} = useContext(Context)
    const onAdd = async (itemAmount) => {
        try {
            const itemCarrito = {producto: item, cantidad: itemAmount}
            const resp = await fetch(`/api/carritos/productos/`, {
                method: 'POST',
                body: JSON.stringify(itemCarrito),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
            })
            console.log(resp)
      
            if(resp.ok === true) {
                const responseData = await resp.json()
                console.log("200 . responseData ", responseData)
                // mostrar algo para avisar que salio ok
            }
            else {
                const responseData = await resp.json()
                console.log("Error get items ", responseData)
                if (responseData.loged === "false") { setSessionUser(); return}
                // poner un aviso que algo salió mal
                
            }
        }
        catch(err) {
            console.log("Error get items ", err.message)
            // poner un aviso de que algo salió mal
        }
    }

        
    
    return (
        <div>
            {
            loading ?
            <p>...cargando</p>
            :
                error ?
                <div>Oops.. hubo un error con el servidor, intenta de nuevo mas tarde</div>
                :
                    item.length == 0 ?
                    <div>El producto solicitado ya no se encuentra entre nosotros...</div>
                    :    
                    <div id={item._id} className='detail-card'>
                        <div className='imgContainer'>
                            <img src={item.imgUrl} width='100%' alt='imagen del producto'/>
                        </div>            
                        <h1 className='title'>{item.nombre}</h1>
                        <h2 className='price'>$ {item.precio}</h2>
                        <p className='description'>{item.descripcion}</p>
                        <Link className='link' to={`/category/${item.categoia}`}><p className='category'>· {item.categoria} ·</p></Link>            
                        <ItemCount initial={1} stock={item.stock} onAdd={onAdd}></ItemCount>
                        <Link className='link' to='/carrito'><button className='btn' >Terminar mi compra</button></Link>
                    </div>   
            }

        </div>

    )
}

export { ItemDetail }
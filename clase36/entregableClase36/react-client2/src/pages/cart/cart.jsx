import React, { Frgment, useEffect, useState, useContext, Fragment } from 'react'
import { Layout } from '../../components/layout/layout'
import { Context } from '../../context/context'
import {CartItem} from '../../components/cartItem/cartItem'
import './cart.css'

function Cart () {
    
    const {sessionUser, setSessionUser} = useContext(Context)
    const [cartItems, setCartitems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState (false)

    const getCartItems = async () => {
        try {
            setLoading(true)
            const resp = await fetch('/api/carritos/productos', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
            })
            console.log(resp)

                            
            if(resp.ok === true) {
                const responseData = await resp.json()
                console.log("200 . responseData ", responseData)
                setLoading(false)
                setCartitems(responseData)
            }
            else {
                const responseData = await resp.json()
                console.log("Error get items ", responseData)
                if (responseData.loged === "false") { setSessionUser(); return}
                setLoading(false)
                setError(true)
                // poner un aviso
            }
        }
        catch(err) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        getCartItems()
    }, [])


    const enviarPedido = async () => {
        try {
            const resp = await fetch('/api/pedidos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({productos: cartItems})
            })
            console.log(resp)
                            
            if(resp.ok === true) {
                const responseData = await resp.json()
                console.log("200 . responseData ", responseData)

                const respDelete = await fetch('/api/carritos/productos', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-type': 'application/json'
                    }
                })
                if(respDelete.ok === true) {
                    getCartItems()
                }

            }
            else {
                const responseData = await resp.json()
                console.log("Error post pedido ", responseData)
                if (responseData.loged === "false") { setSessionUser(); return}
                // poner un aviso
            }
        }
        catch(err) {
            console.log("Error post pedido ", err.message)
        }
    }


    return (
        <Layout>
            <div className='cartContainer'>
                <h1 className='title'>Carrito</h1>

                {
                    loading
                        ? <h3>Cargando productos del carrito</h3>
                        : error
                            ? <h3>Hubo un error carganado los productos del carrito: {error}</h3>
                            : 
                            <Fragment>
                                {cartItems.map(elem => <CartItem item={elem.producto} quantity={elem.cantidad}/>)}
                                <div className='btn' onClick={enviarPedido}>Enviar pedido</div>
                            </Fragment>
                }

                <hr/>
            </div>   
        </Layout>
    )
}

export { Cart }
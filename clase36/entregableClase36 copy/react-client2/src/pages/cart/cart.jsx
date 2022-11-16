import React, { useEffect, useState, useContext } from 'react'
import { Layout } from '../../components/layout/layout'
import { Context } from '../../context/context'
import {CartItem} from '../../components/cartItem/cartItem'
import './cart.css'

function Cart () {
    
    const {sessionUser, setSessionUser} = useContext(Context)
    const [cartItems, setCartitems] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState ()

    useEffect(() => {
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
        getCartItems()


    }, [])



    return (
        <Layout>
            <div className='cartContainer'>
                <h1 className='title'>Carrito</h1>

                {
                    loading
                        ? <h3>Cargando productos del carrito</h3>
                        : error
                            ? <h3>Hubo un error carganado los productos del carrito</h3>
                            : cartItems.map(elem => <CartItem item={elem.producto} quantity={elem.cantidad}/>)
                }

                <hr/>
            </div>   
        </Layout>
    )
}

export { Cart }
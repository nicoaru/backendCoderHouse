//
import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../../components/layout/layout'
import { ItemDetail } from '../../components/itemDetail/itemDetail'
import { Context } from '../../context/context'
import './itemDetailContainer.css'


function ItemDetailContainer() {
    
    // CONTEXT
    const { sessoinUser, setSessionUser } = useContext(Context)
    //ITEM ID que se obtiene por parametro
    const { itemId } = useParams()
    // console.log(`ItemDetailContainer. ID de producto es: ${itemId}`)
    //DEFINO EL STATE loading
    const [loading, setLoading] = useState()
    //DEFINO EL STATE error
    const [error, setError] = useState ()
    //DEFINO EL STATE itemMostrar
    const [itemMostrar, setItemMostrar] = useState([])

    //PEDIDO AL SERVIDOR DE PRODUCTOS A MOSTRAR (solo en 1er render) Y LO GUARDO EN STATE items
    useEffect(() => {
        const getItem = async () => {
            try {
                setLoading(true)
                const resp = await fetch(`/api/productos/${itemId}`, {
                    method: 'GET',
                    // credentials: 'include',
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
                    setItemMostrar(responseData)
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
        getItem()
    }, [])

    // console.log('itemMostrar', itemMostrar)


    return(
        <Layout>
            <ItemDetail item={itemMostrar} loading={loading} error={error}/>
        </Layout>
    )
}

export { ItemDetailContainer}
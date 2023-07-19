import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../../components/layout/layout'
import { ItemList } from '../../components/itemList/itemList'
import { Context } from "../../context/context"

import './itemListContainer.css'


function ItemListContainer() {

    // CONTEXT
    const {setSessionUser} = useContext(Context)
    //CATEGORY ID que se obtiene por parametro
    let {categoryId} = useParams();
        // console.log(`En ItemListcontainer estamos en la categoria ${categoryId}`)
    //DEFINO EL STATE loading
    const [loading, setLoading] = useState()
    //DEFINO EL STATE error
    const [error, setError] = useState ()
    //DEFINO EL STATE DONDE GUARDO LOS DATOS DE getItems
    const [items, setItems] = useState([])    
    //DEFINO VARIABLE DONDE GUARDO LOS ITEMS A MOSTRAR (filtrados por categoria)
    let itemsMostrar

    //PEDIDO AL SERVIDOR DE PRODUCTOS A MOSTRAR (cada ve que cambia categoryId) Y LO GUARDO EN STATE items
    useEffect(() => {

        const getItems = async () => {
            try {
                setLoading(true)
                const resp = await fetch('/api/productos', {
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
                    setItems(responseData)
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

        getItems()

    }, [])



    // console.log('state items', items)
    // itemsMostrar = (categoryId ? items.filter(item => item.category === categoryId) : items)


    return (
        <Layout>
            <ItemList itemsMostrar={items} categoryId={categoryId} loading={loading} error={error}/>
        </Layout>
    )
}

export { ItemListContainer }
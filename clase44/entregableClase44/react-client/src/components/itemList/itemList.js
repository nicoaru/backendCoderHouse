//
import React from 'react'
import './itemList.css'
import { Item } from '../item/item'
import loadingGif from '../../recursos/spinner.svg'

////
function ItemList({itemsMostrar, loading, categoryId, error}) {


    let itemsJSX = itemsMostrar.map(item => <Item item={item} key={item._id}/>)


    return(
        <div id='itemsContainer'>
        {itemsJSX}
        {/* {loading ? 
        <p>...cargando</p>
        // <img src={loadingGif} alt='spinner' height='150px'/>
        :
            error ?
            <div>Oops.. hubo un error con el servidor, intenta de nuevo mas tarde</div>
            :
                itemsMostrar.length == 0 ?
                <div>No tenemos productos con la categoria {categoryId}...</div>
                :
                itemsJSX 
        } */}
        
        </div>
    )
}

export { ItemList }
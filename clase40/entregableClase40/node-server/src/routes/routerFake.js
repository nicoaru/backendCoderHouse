const {generateDataProducts} = require('../utils/fakeDataGenerator.js')
const { ProductosDAO} = require("../model/daos/daos.js")
const { Router } = require("express")
const routerFake = Router()


// '/gaenerateProductosFake'
routerFake.post('/productos', async (req, res) => {
    
    const productsArray = generateDataProducts(10)
    const _result = await ProductosDAO.saveMany(productsArray)
    console.log("fake products result ", _result)
    res.json(_result)
})


module.exports = {routerFake}

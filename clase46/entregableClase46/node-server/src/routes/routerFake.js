const {generateDataProducts} = require('../utils/fakeDataGenerator.js')
const { ProductosDAO} = require("../model/daos/daos.js")
const Router = require('koa-router')
const routerFake = new Router({
    prefix: '/fake'
})

// '/gaenerateProductosFake'
routerFake.post('/productos', async (ctx) => {
    
    const productsArray = generateDataProducts(10)
    const _result = await ProductosDAO.saveMany(productsArray)
    console.log("fake products result ", _result)
    
    ctx.body = _result
})


module.exports = {routerFake}

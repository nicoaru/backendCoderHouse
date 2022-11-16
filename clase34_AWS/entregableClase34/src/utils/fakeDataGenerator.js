const {faker} = require("@faker-js/faker")

function generateDataProducts(n) {
    const productos = []
    for (let i=0; i<n; i++) {
        const _producto = {
            nombre: faker.commerce.productName(),
            descripcion: faker.commerce.productDescription(),
            codigo: faker.random.alphaNumeric(5),
            precio: faker.commerce.price(10, 3000, 2),
            thumbnail: faker.image.unsplash.objects(250,250,true),
            stock: faker.mersenne.rand(1000, 0)
        }
        productos.push(_producto)
    }
    console.log("productos generados =>", productos.length)
    return productos
}

module.exports = { generateDataProducts }
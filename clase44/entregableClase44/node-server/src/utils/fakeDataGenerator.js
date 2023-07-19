const {faker} = require("@faker-js/faker")

function generateDataProducts(n) {
    const productos = []
    for (let i=0; i<n; i++) {
        const _producto = {
            nombre: faker.commerce.productName(),
            descripcion: faker.commerce.productDescription(),
            categoria: faker.helpers.arrayElement(['Art. de libreria', 'Juguetes', 'Ropa' ]),
            codigo: faker.random.alphaNumeric(5),
            precio: faker.commerce.price(10, 3000, 2),
            imgUrl: faker.image.unsplash.objects(250,250,true),
            stock: faker.mersenne.rand(1000, 0)
        }
        productos.push(_producto)
    }
    // console.log("FAKE productos generados =>", productos.length)
    return productos
}


function generateDataUser() {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const user = {
        username: faker.internet.userName(`${firstName}`, `${lastName}`),
        name: `${firstName} ${lastName}`,
        password: faker.internet.password(4, true),
        email: faker.internet.email(`${firstName}`, `${lastName}`),
        telephone: faker.phone.number('+54 911 #### ####'),
        address: faker.address.streetAddress(false),
        imgurl: faker.image.avatar()
    }
    // console.log("FAKE user generado =>", user)
    return user    
}

module.exports = { generateDataProducts, generateDataUser }
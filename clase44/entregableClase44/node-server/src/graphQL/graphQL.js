const {buildSchema} = require('graphql');
const { getCarrito, getProductosCarrito, deleteItemsCarrito, saveItemCarrito } = require('../service/controllers/controller.carritos.js');
const { getPedidos, savePedido } = require('../service/controllers/controller.pedidos.js');
const { getProducts, getProductById, saveProducts, updateProductById, deleteProductById } = require('../service/controllers/controller.productos.js');
const { createUser } = require('../service/controllers/controller.users.js');


// String, Int, Float, Boolean, and ID

const schema = buildSchema(`

    input ProductoInput {
        nombre: String,
        descripcion: String,
        categoria: String,
        codigo: String,
        imgUrl: String,
        precio: Float,
        stock: Int
    }

    type Producto {
        id: ID!
        nombre: String!,
        descripcion: String,
        categoria: String,
        codigo: String,
        imgUrl: String,
        precio: Float,
        stock: Int
    }

    type DeleteConfirmation {
        acknowledged: Boolean,
        deletedCount: Int
    }

    input UserInput {
        username: String!,
        name: String!,
        password: String!,
        email: String,
        telephone: String,
        address: String,
        imgurl: String    
    }

    type User {
        _id: ID!
        username: String!,
        name: String!,
        password: String!,
        email: String!,
        telephone: String,
        address: String,
        imgurl: String    
    }

    input CartItemInput {
        producto: ProductoInput,
        cantidad: Int
    }

    type CartItem {
        producto: Producto,
        cantidad: Int
    }

    input CarritoInput {
        userId: String!,
        productos: [CartItemInput]
    }

    type Carrito {
        id: ID!,
        userId: String!,
        productos: [CartItem]
    }

    type Pedido {
        id: ID,
        userId: String!,
        nombre: String,
        email: String,
        items: [CartItem],
        precioTotal: Float,
        direccion: String    
    }


    type Query {
        getProductById(id: ID!): Producto
        getProducts: [Producto]
        getCarrito(userId: ID!): Carrito
        getProductosCarrito(userId: ID!): [CartItem]
        getPedidos(userId: ID!): [Pedido]
    }

    type Mutation {
        saveProducts(input: ProductoInput): Producto
        updateProductById(id: ID!, input: ProductoInput): Producto
        deleteProductById(id: ID!): DeleteConfirmation

        createUser(input: UserInput): User

        deleteItemsCarrito(userId: ID!): Carrito
        saveItemCarrito(userId: ID!, input: CartItemInput): Carrito

        savePedido(userId:ID!): Pedido
    }
`);


const rootValue = {
    getProducts: getProducts,
    getProductById: getProductById,
    saveProducts: saveProducts, 
    updateProductById: updateProductById,
    deleteProductById: deleteProductById,
    createUser: createUser,
    getCarrito: getCarrito,
    getProductosCarrito: getProductosCarrito,
    deleteItemsCarrito: deleteItemsCarrito,
    saveItemCarrito: saveItemCarrito,
    getPedidos: getPedidos,
    savePedido: savePedido
}

module.exports = {
    schema,
    rootValue
}
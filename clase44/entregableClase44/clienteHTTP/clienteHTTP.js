const axios = require('axios');
const { client } = require('./client');

let newProduct = {
    nombre: 'Casita de madera',
    descripcion: 'DE coltroes variestr',
    categoria: 'Ropa',
    codigo: '0h86n4',
    imgUrl: 'https://source.unsplash.com/category/objects/250x250?true',
    precio: 10000,
    stock: 50
}


// const login = new Promise((resolve, reject) => {
//     const loginData = {
//         username: 'nicoaru',
//         password: '1234'
//     }
//     client.post('http://localhost:8080/api/users/login', loginData, {headers: {'accept-encoding': '*'}})
//     .then(res => {
//         const data = res.data
//         console.log(data)
//         resolve(data)
//     })
//     .catch(err => {
//         const data = err.response.data
//         console.log(data)
//         resolve(data)     
//     })    

// }) 

async function login() {
    const loginData = {
        username: 'nicoaru',
        password: '1234'
    }
    await client.post('http://localhost:8080/api/users/login', loginData, {headers: {'accept-encoding': '*'}})
    .then(res => {
        data = res.data
        console.log("LOGIN RESPONSE", data)
        return data
    })
    .catch(err => {
        data = err.response.data
        console.log("LOGIN RESPONSE", data)
        return data
    })
    return
}


async function getProducts() {
    let data
    await client.get('http://localhost:8080/api/productos', {headers: {'accept-encoding': '*'}})
    .then(res => {
        data = res.data
        console.log("GET PRODUCTS RESPONSE", data)
        return data
    })
    .catch(err => {
        data = err.response.data
        console.log("GET PRODUCTS RESPONSE", data)        
        return data
    })
    return
}

async function saveProduct() {

    await client.post('http://localhost:8080/api/productos', newProduct, {headers: {'accept-encoding': '*'}})
    .then(res => {
        const data = res.data
        console.log("SAVE PRODUCT RESPONSE", data)
        newProduct = data
        return data
    })
    .catch(err => {
        const data = err.response.data
        console.log("SAVE PRODUCT RESPONSE", data)        
        return data
    })
    return
}

async function updateProduct() {
    const updateProduct = {
        descripcion: 'De colores varios',
        categoria: 'Juguetes',
        codigo: '0h86n4',
        imgUrl: 'https://source.unsplash.com/category/objects/250x250?true',
        precio: 10000,
        stock: 40
    }
    await client.put(`http://localhost:8080/api/productos/${newProduct._id}`, updateProduct, {headers: {'accept-encoding': '*'}})
    .then(res => {
        const data = res.data
        console.log("UPDATE PRODUCT RESPONSE", data)
        return data
    })
    .catch(err => {
        const data = err.response.data
        console.log("UPDATE PRODUCT RESPONSE", data)        
        return data
    })
    return
}

async function deleteProduct() {
    await client.delete(`http://localhost:8080/api/productos/${newProduct._id}`, {headers: {'accept-encoding': '*'}})
    .then(res => {
        const data = res.data
        console.log("DELETE PRODUCT RESPONSE", data)
        return data
    })
    .catch(err => {
        const data = err.response.data
        console.log("DELETE PRODUCT RESPONSE", data)        
        return data
    })
    return
}

async function getProductById() {
    let data
    await client.get(`http://localhost:8080/api/productos/${newProduct._id}`, {headers: {'accept-encoding': '*'}})
    .then(res => {
        data = res.data
        console.log("GET PRODUCTById RESPONSE (debería ser null porque lo acabo de borrar) => ", data)
        return data
    })
    .catch(err => {
        data = err.response.data
        console.log("GET PRODUCTById RESPONSE si da error => ", data)        
        return data
    })
    return
}


async function main(){
    await login()
    await saveProduct()
    await getProducts()
    await updateProduct()
    await deleteProduct()
    await getProductById()
}


main()







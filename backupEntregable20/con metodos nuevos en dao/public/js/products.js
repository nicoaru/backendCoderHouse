// UPDATE_PRODUCTS - LISTEN ON - (recibe historial de mensajes al conectarse)
socket.on("PRODUCTS_LIST", data => { 
    if(data.error) { 
        console.log(data)
        productsContainer.innerHTML = `${data.message}`
    }
    else {
        fetch("/templates/tableProducts.hbs")
        .then(response => {
            if (response.ok)
            return response.text()
            else
            throw new Error(response.status);
        })
            .then(plantilla => {
                const templateTableProductsHbs = Handlebars.compile(plantilla)
                const tableProductsHtml = templateTableProductsHbs({productos: data})
                productsContainer.innerHTML = tableProductsHtml
            })
        .catch(err => {
            console.error("ERROR => ", err.message)
        });
    }
})

// CARGAR_PRODUCT - EMIT - carga un producto nuevo
const handleCargarProducto = (e) => {
    const nombre = nombreInput.value
    const descripcion = descripcionInput.value
    const codigo = codigoInput.value
    const precio = precioInput.value
    const thumbnail = thumbnailInput.value
    const stock = stockInput.value
    const product = {nombre, precio, thumbnail, descripcion, codigo, stock}
    socket.emit("CARGAR_PRODUCT", product)
}

// DELET_PRODUCT - EMIT - elimina un producto por su id 
const handleDeleteProducto = (e) => {
    const id = e.target.dataset.productid
    socket.emit("DELETE_PRODUCT", id)
}

// // UPDATE_CLIENT_LIST - LISTEN ON - (recibe nuevo producto para agregar a la lista en Client)
// socket.on("UPDATE_CLIENT_LIST", (msgObject) => {
//     addMessage(msgObject, msgContainer)
//     console.log("Update client list", msgObject)
// })

// OTRAS VARIABLES
const nombreInput = document.getElementById("nombre")
const precioInput = document.getElementById("precio")
const thumbnailInput = document.getElementById("thumbnail")
const descripcionInput = document.getElementById("descripcion")
const codigoInput = document.getElementById("codigo")
const stockInput = document.getElementById("stock")
const productsContainer = document.getElementById("productsContainer")

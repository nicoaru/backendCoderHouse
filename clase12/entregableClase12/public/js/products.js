// UPDATE_PRODUCTS - LISTEN ON - (recibe historial de mensajes al conectarse)
socket.on("UPDATE_PRODUCTS", data => { 
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
    const title = titleInput.value
    const price = priceInput.value
    const thumbnail = thumbnailInput.value
    const product = {title, price, thumbnail}
    socket.emit("CARGAR_PRODUCT", product)
}

// // UPDATE_CLIENT_LIST - LISTEN ON - (recibe nuevo producto para agregar a la lista en Client)
// socket.on("UPDATE_CLIENT_LIST", (msgObject) => {
//     addMessage(msgObject, msgContainer)
//     console.log("Update client list", msgObject)
// })

// OTRAS VARIABLES
const titleInput = document.getElementById("title")
const priceInput = document.getElementById("price")
const thumbnailInput = document.getElementById("thumbnail")
const productsContainer = document.getElementById("productsContainer")

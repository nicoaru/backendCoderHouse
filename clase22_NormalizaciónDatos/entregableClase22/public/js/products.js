

const handleVerProductos = async (e) => {
    try{
        const response = await fetch('http://localhost:8080/api/productos-test')
        if (response.ok) {
            let productos = await response.json()
            console.log("productos => ", productos)
            try{
                const response = await fetch("/templates/tableProducts.hbs")
                if (response.ok) {
                    let plantilla = await response.text()
                    const templateTableProductsHbs = Handlebars.compile(plantilla)
                    const tableProductsHtml = templateTableProductsHbs({productos: productos})
                    productsContainer.innerHTML = tableProductsHtml
                }
                else throw new Error(response.status)
            }
            catch(error){
                console.log("Error fetching hbs-template => ", error.message)
            }
        }
        else throw new Error(response.status)
    }
    catch(error){
        console.log("Error fetching productos-test => ", error.message)
    }
}

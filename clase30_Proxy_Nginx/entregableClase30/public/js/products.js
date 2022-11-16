

const handleVerProductos = async (e) => {
    try{
        await fetch('/api/productos-test', {method: 'GET', redirect: 'follow'})
        .then(async response => {
            console.log("line 7 . response => ", response)
            if(response.redirected) {
                const myModal = new bootstrap.Modal(document.getElementById('logoutModal'), {backdrop: 'static'})
                logoutModalMessage.innerHTML = "La sesión expiró"
                myModal.show()
                setTimeout(() => window.location.replace(response.url), 2000)
            }
            else if (response.ok) {
                let productos = await response.json()
                console.log("productos => ", productos)
                try{
                    const response = await fetch("/static/templates/tableProducts.hbs")
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
            else throw {error: response.status, message: response.statusText}

        })

    }
    catch(error){
        console.log("Error fetching productos-test => ", error)
    }
}


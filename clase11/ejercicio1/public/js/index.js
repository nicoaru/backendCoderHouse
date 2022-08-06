// Cliente WebSocket

const socket = io();

socket.on("connect", () => {
    console.log("Cliente. Se ha conectado")

})
socket.on("ALL_MESSAGES", mensajes => {
    mensajes.forEach(msgObject => addMessage(msgObject, "msgContainer"))
})

let nombre

// SEND MESSAGE
const handleSendMessage = (e) => {
    const mensaje = document.getElementById("msgText").value
    const time = Date()
    const msg = {mensaje, time, nombre}
    socket.emit("SEND_MESSAGE", msg)
}

// RECEIVE NEW MESSAGE
socket.on("NEW_MESSAGE", msgObject => {
    addMessage(msgObject, "msgContainer")
})
// 

// addMessage()
const addMessage = (msgObject, msgContainerId) => {
    const autorHtml = `<span><strong>${msgObject.nombre}</strong>: </span>`
    const msgHtml = `<span>${msgObject.mensaje}</span>`
    const timeHtml = `<p>${msgObject.time}</p>`
    const msgContainer = document.getElementById(msgContainerId)
    msgContainer.innerHTML+= `<div class="bg-light border d-flex flex-column flex-md-row justify-content-between p-3"> <div>${autorHtml} ${msgHtml}</div> <div>${timeHtml}</div></div>`
}

// cargarNombre()
const handleCargarNombre = () => {
    nombre = document.getElementById("nameInput").value
    document.getElementById("nameInput").setAttribute('disabled', '')
    document.getElementById("nameinputButton").setAttribute('disabled', '')
    console.log(nombre)
}
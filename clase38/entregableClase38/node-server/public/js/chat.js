// Connect Client WebSocket to Server
const socket = io();

let socketId
socket.on("connect", () => {
    socketId = socket.id
    console.log("Cliente conectado", socketId)
})

// INIT_MESSAGES - LISTEN ON - (recibe historial de mensajes al conectarse)
socket.on("INIT_MESSAGES", data => { 
    if(data.error) { 
        console.log(data)
        msgContainer.innerHTML = `${data.message}`
    }
    else {  
        console.log("data => ", data)
        msgContainer.innerHTML = ''
        data.forEach(msgObject => addMessage(msgObject, msgContainer))
        // const denormalizedMsgs = denormalizeMensajes(data)
        // console.log("DEnormalized => ", denormalizedMsgs)
        // normalizedLength.innerHTML = `${calculateLenght(data)}`
        // denormalizedLength.innerHTML = `${calculateLenght(denormalizedMsgs)}`
        // compresion.innerHTML = `${(calculateLenght(denormalizedMsgs)/calculateLenght(data)).toFixed(2)}%`
        // denormalizedMsgs.forEach(msgObject => addMessage(msgObject, msgContainer))
    }
})

//////backup////////

// SEND_MESSAGE - EMIT - (manda nuevo mensaje)
const handleSendMessage = (e) => {
    if(sessionUser) {
        console.log("sessionUser en chat ", sessionUser)
        const text = document.getElementById("msgTextInput").value
        const msg = {author: sessionUser, text}
        msgInput.value = null
        socket.emit("SEND_MESSAGE", msg)
    }
    else {
        const toastElement = document.getElementById('sendMessageToast')
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
    }
}


// RECEIVE_MESSAGE - LISTEN ON - (recibe nuevo mensaje)
socket.on("RECEIVE_MESSAGE", (msgObject) => {
    addMessage(msgObject, msgContainer)
})



// OTRAS FUNCIONES

// addMessage()
const addMessage = (msgObject, container) => {
    const authorHtml = `<span style="color: blue"><strong>${msgObject.author.email}</strong>: </span>`
    const msgHtml = `<span style="color: green"><i>${msgObject.text}</i></span>`
    const timeHtml = `<span style="color: brown">${new Date(msgObject.createdAt).toLocaleString()}</span>`
    container.innerHTML+= `<div id="msg-${msgObject._id}" class="bg-light border d-flex justify-content-between p-3"> <div>${authorHtml} ${msgHtml}</div> <div>${timeHtml}</div></div>`
    scrollBottom(msgContainer)
}

// scrollBottom()
const scrollBottom = (element) => {
    element.scroll({top: element.scrollHeight, behavior: "instant"})
}

// OTRAS VARIABLES
const msgContainer = document.getElementById("msgContainer")
const msgInput = document.getElementById("msgTextInput")

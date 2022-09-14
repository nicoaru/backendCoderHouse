

// INIT_MESSAGES - LISTEN ON - (recibe historial de mensajes al conectarse)
socket.on("INIT_MESSAGES", data => { 
    if(data.error) { 
        console.log(data)
        msgContainer.innerHTML = `${data.message}`
    }
    else {  
        console.log("data => ", data)
        msgContainer.innerHTML = ''
        const denormalizedMsgs = denormalizeMensajes(data)
        console.log("DEnormalized => ", denormalizedMsgs)
        normalizedLength.innerHTML = `${calculateLenght(data)}`
        denormalizedLength.innerHTML = `${calculateLenght(denormalizedMsgs)}`
        compresion.innerHTML = `${(calculateLenght(denormalizedMsgs)/calculateLenght(data)).toFixed(2)}%`
        denormalizedMsgs.forEach(msgObject => addMessage(msgObject, msgContainer))
    }
})



// SEND_MESSAGE - EMIT - (manda nuevo mensaje)
const handleSendMessage = (e) => {
    if(user) {
        const text = document.getElementById("msgTextInput").value
        const msg = {author: user, text}
        document.getElementById("msgTextInput").value = null
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

// handleLogin()
let user
const handleLogin = (e) => {
    const emailInputValue = document.getElementById("emailInput").value
    if(emailInputValue && validateEmail(emailInputValue)) {
        user = {
        email: emailInputValue,
        nombre: nombreInput.value, 
        apellido: apellidoInput.value, 
        edad: edadInput.value, 
        alias: aliasInput.value,
        avatar: avatarInput.value
        }

        document.getElementById("emailInput").setAttribute('disabled', '')
        apellidoInput.setAttribute('disabled', '')
        edadInput.setAttribute('disabled', '')
        aliasInput.setAttribute('disabled', '')
        nombreInput.setAttribute('disabled', '')
        avatarInput.setAttribute('disabled', '')
        document.getElementById("loginButton").setAttribute('disabled', '')
        console.log("Usuario logueado => ", user)
    }
    else {
        const toastElement = document.getElementById('loginToast')
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
    }
}
// scrollBottom()
const scrollBottom = (element) => {
    element.scroll({top: element.scrollHeight, behavior: "instant"})
}
// validateEmail()
const validateEmail = (value) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.match(validRegex)) { return true } 
    else { return false }
}

// OTRAS VARIABLES
const msgContainer = document.getElementById("msgContainer")
const msgInput = document.getElementById("msgTextInput")
const emailInput = document.getElementById("emailInput")
const nombreInput = document.getElementById("nombreInput")
const apellidoInput = document.getElementById("apellidoInput")
const edadInput = document.getElementById("edadInput")
const aliasInput = document.getElementById("aliasInput")
const avatarInput = document.getElementById("avatarInput")
const denormalizedLength = document.getElementById("denormalizedLength")
const normalizedLength = document.getElementById("normalizedLength")
const compresion = document.getElementById("compresion")
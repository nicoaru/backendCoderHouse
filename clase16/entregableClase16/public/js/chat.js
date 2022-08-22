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
    }
})

// SEND_MESSAGE - EMIT - (manda nuevo mensaje)
const handleSendMessage = (e) => {
    if(email) {
        const message = document.getElementById("msgText").value
        const timeStamp = Date.now()
        const msg = {message, timeStamp, author: email}
        document.getElementById("msgText").value = null
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
    const authorHtml = `<span style="color: blue"><strong>${msgObject.author}</strong>: </span>`
    const msgHtml = `<span style="color: green"><i>${msgObject.message}</i></span>`
    const timeHtml = `<span style="color: brown">${new Date(msgObject.timeStamp).toLocaleString()}</span>`
    container.innerHTML+= `<div id="msg-${msgObject.messageId}" class="bg-light border d-flex justify-content-between p-3"> <div>${authorHtml} ${msgHtml}</div> <div>${timeHtml}</div></div>`
    scrollBottom(msgContainer)
}
// handleCargarEmail()
let email
const handleCargarEmail = (e) => {
    const emailInputValue = document.getElementById("emailInput").value
    if(emailInputValue && validateEmail(emailInputValue)) {
        email = emailInputValue
        document.getElementById("emailInput").setAttribute('disabled', '')
        document.getElementById("emailInputButton").setAttribute('disabled', '')
        console.log(email)
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

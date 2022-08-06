// Cliente WebSocket

const socket = io();

socket.on("connect", () => {
    console.log("Cliente. Se ha conectado")
})
socket.on("NEW_CONNECTION", data => console.log(data))
socket.on("other_user_connected", data => console.log(data))
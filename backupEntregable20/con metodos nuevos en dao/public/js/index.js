// Connect Client WebSocket to Server
const socket = io();

let socketId
socket.on("connect", () => {
    socketId = socket.id
    console.log("Cliente conectado", socketId)
})


const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const store = require('./store')
require('dotenv').config()


const PORT = process.env.SOCKET_PORT || 4894
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  socket.on('update', (message) => {
    store.setValue(message.payload.key, message.payload.value)
      .then(subscribeToAll(message))
  })
})

function subscribeToAll(message = null) {
  if (message) {
    io.emit('subscribe', message)
  }
}

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))

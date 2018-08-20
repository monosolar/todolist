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
  console.log('User connected')

  //store.getValue().then((data) => { subscribeStateToSocket(data, socket) })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

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

function subscribeStateToSocket(state, socket) {
  if (state) {
    socket.emit('subscribeState', state)
  }
}

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))

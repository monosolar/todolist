import socketIOClient from 'socket.io-client'
import { applyTodos } from '../reducers/todoList'


const signification = Math.random().toString(36).substring(3)
const socket = socketIOClient(`http://localhost:${process.env.SOCKET_PORT}`)
let reduxStore = null

export default function connectionManager(store) {
  if (!process.env.SOCKET_PORT || !store) return

  reduxStore = store

  initStoreSubscribe()


  socket.on('connect', () => {
    console.log('Socket: Connected')
  })

  socket.on('disconnect', () => {
    console.log('Socket: disconnected', socket)
  })

  socket.on('subscribe', receiveMessage)
  socket.on('subscribeState', receiveState)
}

const receiveMessage = (message) => {
  console.log('Received')
  if (message.sign !== signification) {
    if (message.payload.key === 'todoList') {
      reduxStore.dispatch(applyTodos(message.payload.value))
    }
  }
}

const receiveState = (state) => {
  console.log('Received State',state)
  if (state) {
    Object.keys(state).forEach((key) => {
      if (key === 'todoList') {
        reduxStore.dispatch(applyTodos(state[key]))
      }
    })
  }
}

const sendMessage = (value) => {
  console.log('Send:', value)
  socket.emit('update', {
    sign: signification,
    payload: { key: value, value: reduxStore.getState()[value] },
  })
}

const initStoreSubscribe = () => {
  let prevStoreState = reduxStore.getState()

  reduxStore.subscribe(() => {
    if (reduxStore.getState().todoList !== prevStoreState.todoList) {
      console.log('Check: to send')
      sendMessage('todoList', reduxStore)
    }
    prevStoreState = reduxStore.getState()
  })
}

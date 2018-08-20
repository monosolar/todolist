import socketIOClient from 'socket.io-client'
import { applyTodos } from '../reducers/todoList'


const signification = Math.random().toString(36).substring(3)
const socket = socketIOClient(`http://localhost:${process.env.SOCKET_PORT}`)
let reduxStore = null

export default function connectionManager(store) {
  if (!process.env.SOCKET_PORT || !store) return

  reduxStore = store

  initStoreSubscribe()

  socket.on('subscribe', receiveMessage)
}

const receiveMessage = (message) => {
  if (message.sign !== signification) {
    if (message.payload.key === 'todoList') {
      reduxStore.dispatch(applyTodos(message.payload.value))
    }
  }
}

const sendMessage = (value) => {
  socket.emit('update', {
    sign: signification,
    payload: { key: value, value: reduxStore.getState()[value] },
  })
}

const initStoreSubscribe = () => {
  let prevStoreState = reduxStore.getState()

  reduxStore.subscribe(() => {
    if (reduxStore.getState().todoList !== prevStoreState.todoList) {
      sendMessage('todoList', reduxStore)
    }
    prevStoreState = reduxStore.getState()
  })
}

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './configureStore'
import connectionManager from './connectionManager'
import '../styles/style.css'

const store = configureStore()
connectionManager(store)

render(
  <Provider store={store}>
    <div className='app'>
        <App />
    </div>
  </Provider>,
  document.getElementById('root'),
)

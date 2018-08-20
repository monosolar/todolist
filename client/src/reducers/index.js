import { combineReducers } from 'redux'
import todoList from './todoList'
import uiMovements from './uiMovements'


export default combineReducers({
  uiMovements, todoList, 
})
